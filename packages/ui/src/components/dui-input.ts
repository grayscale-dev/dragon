import IMask from 'imask';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

function parseRegex(pattern: string): RegExp | null {
  const trimmed = pattern.trim();
  if (!trimmed) return null;

  try {
    if (trimmed.startsWith('/')) {
      const finalSlash = trimmed.lastIndexOf('/');
      if (finalSlash > 0) {
        const source = trimmed.slice(1, finalSlash);
        const flags = trimmed.slice(finalSlash + 1);
        return new RegExp(source, flags);
      }
    }

    return new RegExp(trimmed);
  } catch {
    return null;
  }
}

@customElement('dui-input')
export class DuiInput extends LitElement {
  static readonly formAssociated = true;

  static override styles = css`
    :host {
      display: inline-block;
      width: 100%;
    }

    .field {
      position: relative;
      display: block;
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
    }

    .field.floating[data-has-value='true'] label,
    :host(:focus-within) .field.floating label {
      top: 4px;
      transform: scale(0.85);
      color: var(--ui-input-label-color, #475569);
    }

    input {
      box-sizing: border-box;
      width: 100%;
      padding: var(--ui-input-padding, 8px 12px);
      font-size: var(--ui-input-font-size, 16px);
      border: var(--ui-input-border, 1px solid #c6ccd5);
      border-radius: var(--ui-input-radius, 8px);
      background: var(--ui-input-bg, #ffffff);
      color: var(--ui-input-color, #1f2937);
      outline: none;
      transition: box-shadow 120ms ease, border-color 120ms ease;
    }

    input::placeholder {
      color: var(--ui-input-placeholder-color, #9aa4b2);
    }

    input:focus {
      box-shadow: var(--ui-input-focus-ring, 0 0 0 3px rgba(24, 98, 255, 0.25));
    }

    input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .field.floating input {
      padding-top: var(--ui-input-floating-padding-top, 22px);
      padding-right: var(--ui-input-floating-padding-right, 12px);
      padding-bottom: var(--ui-input-floating-padding-bottom, 8px);
      padding-left: var(--ui-input-floating-padding-left, 12px);
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) prefix = '';
  @property({ type: String }) suffix = '';
  @property({ type: String }) template = '';
  @property({ type: String, reflect: true }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) type = 'text';
  @property({ type: String, reflect: true }) autocomplete?: string;
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'label-position' }) labelPosition: 'floating' | 'above' = 'above';
  @property({ type: String, reflect: true }) regex = '';

  @query('input')
  private inputEl?: HTMLInputElement;

  private internals?: ElementInternals;
  private defaultValue?: string;
  private compiledRegex: RegExp | null = null;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.compiledRegex = parseRegex(this.regex);

    if (this.defaultValue === undefined) {
      this.defaultValue = this.getAttribute('value') ?? '';
    }

    this.syncFormValue();
  }

  override willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('regex')) {
      this.compiledRegex = parseRegex(this.regex);
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('regex') || changed.has('prefix') || changed.has('suffix') || changed.has('template')) {
      const normalized = this.normalizeFromValue(this.value);
      if (normalized !== this.value) {
        this.value = normalized;
        return;
      }

      const displayValue = this.formatDisplayValue(normalized);
      if (this.inputEl && this.inputEl.value !== displayValue) {
        this.inputEl.value = displayValue;
      }
    }

    if (changed.has('value') || changed.has('disabled')) {
      this.syncFormValue();
    }
  }

  override focus(options?: FocusOptions): void {
    this.inputEl?.focus(options);
  }

  override blur(): void {
    this.inputEl?.blur();
  }

  formResetCallback(): void {
    this.value = this.normalizeFromValue(this.defaultValue ?? '');
  }

  formStateRestoreCallback(state: unknown): void {
    if (typeof state === 'string') {
      this.value = this.normalizeFromValue(state);
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  private normalizeWithRegex(inputValue: string): string {
    if (!this.compiledRegex) return inputValue;

    const mask = IMask.createMask({ mask: this.compiledRegex }) as {
      resolve: (value: string) => void;
      value: string;
    };

    mask.resolve(inputValue);
    return mask.value;
  }

  private stripAffixes(inputValue: string): string {
    let result = inputValue;

    if (this.prefix) {
      result = result.split(this.prefix).join('');
    }

    if (this.suffix) {
      result = result.split(this.suffix).join('');
    }

    return result;
  }

  private getTemplateCapacity(): number {
    return [...this.template].filter((char) => char === 'x').length;
  }

  private capToTemplate(rawValue: string): string {
    const capacity = this.getTemplateCapacity();
    if (capacity === 0) return rawValue;
    return rawValue.slice(0, capacity);
  }

  private extractTemplateValue(inputValue: string): string {
    if (!this.template) return inputValue;

    const literalChars = new Set([...this.template].filter((char) => char !== 'x'));
    const baseline = [...this.template].filter((char) => char === 'x');
    const filtered = [...inputValue].filter((char) => !literalChars.has(char));
    const capacity = baseline.length;
    const valueChars: string[] = [];

    for (let index = 0; index < Math.min(filtered.length, capacity); index += 1) {
      if (filtered[index] !== baseline[index]) {
        valueChars.push(filtered[index]);
      }
    }

    if (filtered.length > capacity) {
      valueChars.push(...filtered.slice(capacity));
    }

    return valueChars.join('');
  }

  private normalizeFromValue(inputValue: string): string {
    const normalized = this.normalizeWithRegex(this.stripAffixes(inputValue));
    return this.capToTemplate(normalized);
  }

  private normalizeFromUserInput(inputValue: string): string {
    const withoutAffixes = this.stripAffixes(inputValue);
    const templateValue = this.extractTemplateValue(withoutAffixes);
    const normalized = this.normalizeWithRegex(templateValue);
    return this.capToTemplate(normalized);
  }

  private applyTemplate(rawValue: string): string {
    if (!this.template) return rawValue;

    const chars = [...this.capToTemplate(rawValue)];
    let charIndex = 0;

    return [...this.template]
      .map((char) => {
        if (char !== 'x') return char;
        const next = chars[charIndex];
        charIndex += 1;
        return next ?? 'x';
      })
      .join('');
  }

  private formatDisplayValue(rawValue: string): string {
    const templatedValue = this.applyTemplate(rawValue);
    return `${this.prefix}${templatedValue}${this.suffix}`;
  }

  private syncFormValue(): void {
    if (!this.internals) return;
    if (this.disabled) {
      this.internals.setFormValue(null);
      return;
    }
    this.internals.setFormValue(this.value);
  }

  private handleInput(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const nextValue = this.normalizeFromUserInput(target.value);
    const displayValue = this.formatDisplayValue(nextValue);

    if (target.value !== displayValue) {
      target.value = displayValue;
    }

    this.value = nextValue;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private handleChange(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const nextValue = this.normalizeFromUserInput(target.value);
    const displayValue = this.formatDisplayValue(nextValue);

    if (target.value !== displayValue) {
      target.value = displayValue;
    }

    this.value = nextValue;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    const target = event.target as HTMLInputElement;
    const nextValue = this.normalizeFromUserInput(target.value);
    const displayValue = this.formatDisplayValue(nextValue);

    if (target.value !== displayValue) {
      target.value = displayValue;
    }

    this.value = nextValue;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }


  override render() {
    const hasLabel = this.label.length > 0;
    const isFloating = hasLabel && this.labelPosition === 'floating';
    const hasValue = this.value.length > 0;
    const effectivePlaceholder = isFloating ? undefined : this.placeholder || undefined;
    const ariaLabel = this.label || effectivePlaceholder || undefined;

    return html`
      <div class="field ${isFloating ? 'floating' : ''}" data-has-value=${hasValue}>
        ${hasLabel ? html`<label for="input">${this.label}</label>` : null}
        <input
          id="input"
          part="input"
          .value=${this.formatDisplayValue(this.value)}
          .type=${this.type}
          .name=${this.name}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .placeholder=${effectivePlaceholder ?? ''}
          autocomplete=${ifDefined(this.autocomplete)}
          aria-label=${ifDefined(ariaLabel)}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @keydown=${this.handleKeydown}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-input': DuiInput;
  }
}
