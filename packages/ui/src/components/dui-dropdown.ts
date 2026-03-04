import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

function parseOptions(value: string | null): DropdownOption[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object')
      .map((item) => ({
        value: String(item.value ?? ''),
        label: String(item.label ?? item.value ?? ''),
        disabled: Boolean(item.disabled)
      }));
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => ({ value: item, label: item }));
  }
}

function parseValues(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => String(item));
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
}

@customElement('dui-dropdown')
export class DuiDropdown extends LitElement {
  static readonly formAssociated = true;

  static override styles = css`
    :host {
      display: inline-block;
      width: 100%;
    }

    .field {
      position: relative;
      width: 100%;
    }

    label {
      display: block;
      font-size: var(--ui-input-label-font-size, 14px);
      color: var(--ui-input-label-color, #475569);
      margin-bottom: 6px;
      line-height: 1.2;
    }

    .field.floating label {
      position: absolute;
      left: var(--ui-input-floating-label-left, var(--ui-input-floating-padding-left, 12px));
      top: 50%;
      transform: translateY(-50%);
      transform-origin: left center;
      margin: 0;
      padding: 0;
      background: var(--ui-input-bg, #ffffff);
      color: var(--ui-input-placeholder-color, #9aa4b2);
      pointer-events: none;
      transition: transform 120ms ease, top 120ms ease, color 120ms ease;
      z-index: 2;
    }

    .field.floating[data-has-value='true'] label,
    :host(:focus-within) .field.floating label {
      top: 4px;
      transform: scale(0.85);
      color: var(--ui-input-label-color, #475569);
    }

    .menu-anchor {
      position: relative;
      width: 100%;
    }

    .control {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: var(--ui-input-padding, 8px 12px);
      padding-right: calc(var(--ui-input-floating-padding-right, 12px) + 24px);
      font-size: var(--ui-input-font-size, 16px);
      border: var(--ui-input-border, 1px solid #c6ccd5);
      border-radius: var(--ui-input-radius, 8px);
      background: var(--ui-input-bg, #ffffff);
      color: var(--ui-input-color, #1f2937);
      outline: none;
      transition: box-shadow 120ms ease, border-color 120ms ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
    }

    .field.floating .control {
      padding-top: var(--ui-input-floating-padding-top, 22px);
      padding-right: calc(var(--ui-input-floating-padding-right, 12px) + 24px);
      padding-bottom: var(--ui-input-floating-padding-bottom, 8px);
      padding-left: var(--ui-input-floating-padding-left, 12px);
    }

    .control:focus,
    .control:focus-within,
    .field.open .control {
      box-shadow: var(--ui-input-focus-ring, 0 0 0 3px rgba(24, 98, 255, 0.25));
    }

    .control[aria-disabled='true'] {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .single-value {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .single-value.placeholder {
      color: var(--ui-input-placeholder-color, #9aa4b2);
    }

    .search-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    .search-input::placeholder {
      color: var(--ui-input-placeholder-color, #9aa4b2);
    }

    .multi-value {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      flex: 1;
      min-width: 0;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--ui-dropdown-chip-bg, rgba(15, 23, 42, 0.08));
      color: var(--ui-dropdown-chip-color, currentColor);
      border-radius: var(--ui-dropdown-chip-radius, 9999px);
      padding: 2px 8px;
      font-size: 0.85em;
      line-height: 1.2;
      max-width: 100%;
    }

    .chip-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chip-remove {
      border: none;
      background: transparent;
      color: inherit;
      padding: 0;
      margin: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      font-size: 12px;
      line-height: 1;
      flex: 0 0 auto;
    }

    .chip-remove:hover {
      background: rgba(0, 0, 0, 0.08);
    }

    .chevron {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-dropdown-chevron-color, #64748b);
      pointer-events: none;
      transition: transform 120ms ease;
    }

    .field.open .chevron {
      transform: translateY(-50%) rotate(180deg);
    }

    .panel {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 4px);
      z-index: 20;
      border: var(--ui-dropdown-panel-border, 1px solid #d5dbe5);
      border-radius: var(--ui-dropdown-panel-radius, 10px);
      background: var(--ui-dropdown-panel-bg, #ffffff);
      box-shadow: var(--ui-dropdown-panel-shadow, 0 12px 24px rgba(15, 23, 42, 0.12));
      overflow: auto;
      padding: 4px;
      margin: 0;
      list-style: none;
      max-height: calc(var(--ui-dropdown-option-height, 36px) * 6);
    }

    .option {
      width: 100%;
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: var(--ui-dropdown-option-height, 36px);
      padding: var(--ui-dropdown-option-padding, 6px 10px);
      border-radius: 8px;
      cursor: pointer;
    }

    .option:hover:not([disabled]) {
      background: var(--ui-dropdown-option-hover-bg, rgba(15, 23, 42, 0.06));
    }

    .option[selected] {
      background: var(--ui-dropdown-option-selected-bg, rgba(37, 99, 235, 0.12));
    }

    .option[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .option-checkbox {
      pointer-events: none;
      margin: 0;
    }

    .empty {
      min-height: var(--ui-dropdown-option-height, 36px);
      display: flex;
      align-items: center;
      padding: var(--ui-dropdown-option-padding, 6px 10px);
      color: var(--ui-input-placeholder-color, #9aa4b2);
    }
  `;

  @property({ type: String }) value = '';

  @property({
    type: Array,
    converter: {
      fromAttribute: parseValues,
      toAttribute: (value: string[]) => JSON.stringify(value ?? [])
    }
  })
  values: string[] = [];

  @property({
    type: Array,
    converter: {
      fromAttribute: parseOptions,
      toAttribute: (value: DropdownOption[]) => JSON.stringify(value ?? [])
    }
  })
  options: DropdownOption[] = [];

  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'label-position' }) labelPosition: 'floating' | 'above' = 'above';
  @property({ type: Boolean, reflect: true }) searchable = false;
  @property({ type: Boolean, attribute: 'multi-select', reflect: true }) multiSelect = false;
  @property({ type: Number, attribute: 'max-items-shown' }) maxItemsShown = 6;
  @property({ type: String, reflect: true }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  @state() private open = false;
  @state() private searchTerm = '';

  @query('.search-input')
  private searchInputEl?: HTMLInputElement;

  @query('.control')
  private controlEl?: HTMLElement;

  private internals?: ElementInternals;
  private defaultValue?: string;
  private defaultValues: string[] = [];

  private readonly handleWindowPointerDownBound = (event: PointerEvent): void => {
    if (event.composedPath().includes(this)) return;
    this.closeDropdown();
  };

  private readonly handleWindowKeydownBound = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.closeDropdown();
      this.controlEl?.focus();
    }
  };

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.defaultValue === undefined) {
      this.defaultValue = this.getAttribute('value') ?? '';
      this.defaultValues = parseValues(this.getAttribute('values'));
    }
    this.syncFormValue();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeGlobalListeners();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('values') || changed.has('multiSelect') || changed.has('name') || changed.has('disabled')) {
      this.syncFormValue();
    }

    if (changed.has('multiSelect') && !this.multiSelect && this.values.length > 0 && !this.value) {
      this.value = this.values[0] ?? '';
    }
  }

  override focus(options?: FocusOptions): void {
    if (this.searchable) {
      this.searchInputEl?.focus(options);
      return;
    }
    this.controlEl?.focus(options);
  }

  override blur(): void {
    if (this.searchable) {
      this.searchInputEl?.blur();
      return;
    }
    this.controlEl?.blur();
  }

  formResetCallback(): void {
    this.value = this.defaultValue ?? '';
    this.values = [...this.defaultValues];
    this.searchTerm = '';
  }

  formStateRestoreCallback(state: unknown): void {
    if (typeof state === 'string') {
      this.value = state;
    }

    if (Array.isArray(state)) {
      this.values = state.map((item) => String(item));
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  private syncFormValue(): void {
    if (!this.internals) return;

    if (this.disabled || !this.name) {
      this.internals.setFormValue(null);
      return;
    }

    if (this.multiSelect) {
      const data = new FormData();
      this.values.forEach((item) => data.append(this.name, item));
      this.internals.setFormValue(data);
      return;
    }

    this.internals.setFormValue(this.value);
  }

  private addGlobalListeners(): void {
    window.addEventListener('pointerdown', this.handleWindowPointerDownBound);
    window.addEventListener('keydown', this.handleWindowKeydownBound);
  }

  private removeGlobalListeners(): void {
    window.removeEventListener('pointerdown', this.handleWindowPointerDownBound);
    window.removeEventListener('keydown', this.handleWindowKeydownBound);
  }

  private openDropdown(): void {
    if (this.open || this.disabled) return;
    this.open = true;
    this.addGlobalListeners();
  }

  private closeDropdown(): void {
    if (!this.open) return;
    this.open = false;
    this.searchTerm = '';
    this.removeGlobalListeners();
  }

  private toggleDropdown(): void {
    if (this.open) {
      this.closeDropdown();
      return;
    }

    this.openDropdown();
  }

  private get selectedOption(): DropdownOption | undefined {
    return this.options.find((option) => option.value === this.value);
  }

  private get selectedOptions(): DropdownOption[] {
    const selected = new Set(this.values);
    return this.options.filter((option) => selected.has(option.value));
  }

  private get filteredOptions(): DropdownOption[] {
    if (!this.searchable) return this.options;

    const query = this.searchTerm.trim().toLowerCase();
    if (!query) return this.options;

    return this.options.filter((option) => option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query));
  }

  private emitSelectionEvents(): void {
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleControlClick(event: MouseEvent): void {
    if (this.disabled) return;

    if (!this.searchable) {
      event.preventDefault();
      this.toggleDropdown();
      return;
    }

    this.openDropdown();
  }

  private handleControlKeydown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.openDropdown();
    }
  }

  private handleSearchFocus(): void {
    if (this.disabled) return;
    this.openDropdown();
  }

  private handleSearchInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.openDropdown();
  }

  private isOptionSelected(value: string): boolean {
    return this.multiSelect ? this.values.includes(value) : this.value === value;
  }

  private handleOptionClick(option: DropdownOption): void {
    if (this.disabled || option.disabled) return;

    if (this.multiSelect) {
      const next = new Set(this.values);
      if (next.has(option.value)) {
        next.delete(option.value);
      } else {
        next.add(option.value);
      }
      this.values = Array.from(next);
      if (this.searchable && this.searchInputEl) {
        this.searchInputEl.focus();
      }
      this.emitSelectionEvents();
      return;
    }

    this.value = option.value;
    this.closeDropdown();
    this.emitSelectionEvents();
  }

  private handleChipRemove(value: string, event: MouseEvent): void {
    event.stopPropagation();
    const next = this.values.filter((item) => item !== value);
    if (next.length === this.values.length) return;
    this.values = next;
    this.emitSelectionEvents();
  }

  private renderChevron() {
    return html`
      <span class="chevron" part="chevron" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </span>
    `;
  }

  private renderSingleValue(effectivePlaceholder: string, ariaLabel: string | undefined) {
    if (this.searchable) {
      const displayValue = this.open ? this.searchTerm : this.selectedOption?.label ?? '';
      return html`
        <input
          part="input"
          class="search-input"
          .value=${displayValue}
          .placeholder=${effectivePlaceholder}
          ?disabled=${this.disabled}
          aria-label=${ifDefined(ariaLabel)}
          @focus=${this.handleSearchFocus}
          @input=${this.handleSearchInput}
        />
      `;
    }

    const selectedLabel = this.selectedOption?.label ?? '';
    return html`
      <span class="single-value ${selectedLabel ? '' : 'placeholder'}" part="input">
        ${selectedLabel || effectivePlaceholder}
      </span>
    `;
  }

  private renderMultiValue(effectivePlaceholder: string, ariaLabel: string | undefined) {
    const selected = this.selectedOptions;

    return html`
      <div class="multi-value" part="input">
        ${selected.map((option) => {
          return html`
            <span class="chip" part="chip">
              <span class="chip-label">${option.label}</span>
              <button
                class="chip-remove"
                type="button"
                part="chip-remove"
                aria-label=${`Remove ${option.label}`}
                @click=${(event: MouseEvent) => this.handleChipRemove(option.value, event)}
              >
                ×
              </button>
            </span>
          `;
        })}

        ${this.searchable
          ? html`
              <input
                part="input"
                class="search-input"
                .value=${this.searchTerm}
                .placeholder=${selected.length === 0 ? effectivePlaceholder : ''}
                ?disabled=${this.disabled}
                aria-label=${ifDefined(ariaLabel)}
                @focus=${this.handleSearchFocus}
                @input=${this.handleSearchInput}
              />
            `
          : selected.length === 0
            ? html`<span class="single-value placeholder">${effectivePlaceholder}</span>`
            : nothing}
      </div>
    `;
  }

  private renderPanel() {
    if (!this.open) return nothing;

    const options = this.filteredOptions;
    const maxShown = Number.isFinite(this.maxItemsShown) && this.maxItemsShown > 0 ? Math.floor(this.maxItemsShown) : 6;
    const maxHeight = `calc(${maxShown} * var(--ui-dropdown-option-height, 36px))`;

    return html`
      <ul class="panel" part="panel" role="listbox" style=${`max-height: ${maxHeight};`}>
        ${options.length === 0
          ? html`<li class="empty">No options</li>`
          : options.map((option) => {
              const selected = this.isOptionSelected(option.value);

              return html`
                <li>
                  <button
                    class="option"
                    part="option"
                    role="option"
                    aria-selected=${String(selected)}
                    ?selected=${selected}
                    ?disabled=${option.disabled}
                    type="button"
                    @click=${() => this.handleOptionClick(option)}
                  >
                    ${this.multiSelect
                      ? html`<input class="option-checkbox" type="checkbox" .checked=${selected} tabindex="-1" aria-hidden="true" />`
                      : nothing}
                    <span>${option.label}</span>
                  </button>
                </li>
              `;
            })}
      </ul>
    `;
  }

  override render() {
    const hasLabel = this.label.length > 0;
    const isFloating = hasLabel && this.labelPosition === 'floating';
    const hasValue = this.multiSelect ? this.values.length > 0 : this.value.length > 0;
    const effectivePlaceholder = isFloating ? '' : this.placeholder;
    const ariaLabel = this.label || this.placeholder || undefined;

    return html`
      <div class="field ${this.open ? 'open' : ''} ${isFloating ? 'floating' : ''}" data-has-value=${String(hasValue)}>
        ${hasLabel ? html`<label>${this.label}</label>` : nothing}

        <div class="menu-anchor">
          <div
            class="control"
            part="control"
            role="combobox"
            tabindex=${this.searchable ? -1 : 0}
            aria-expanded=${String(this.open)}
            aria-disabled=${String(this.disabled)}
            aria-haspopup="listbox"
            aria-label=${ifDefined(ariaLabel)}
            @click=${this.handleControlClick}
            @keydown=${this.handleControlKeydown}
          >
            ${this.multiSelect
              ? this.renderMultiValue(effectivePlaceholder, ariaLabel)
              : this.renderSingleValue(effectivePlaceholder, ariaLabel)}
            ${this.renderChevron()}
          </div>

          ${this.renderPanel()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-dropdown': DuiDropdown;
  }
}
