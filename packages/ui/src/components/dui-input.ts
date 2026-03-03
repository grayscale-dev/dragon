import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

type MaskToken =
  | { kind: 'literal'; value: string }
  | { kind: 'slot'; test: (char: string) => boolean; placeholder: string };

interface ParsedMask {
  source: string;
  tokens: MaskToken[];
  placeholder: string;
}

function normalizeRegexSource(pattern: string): string {
  const trimmed = pattern.trim();
  if (trimmed.startsWith('/') && trimmed.lastIndexOf('/') > 0) {
    const finalSlash = trimmed.lastIndexOf('/');
    return trimmed.slice(1, finalSlash);
  }
  return trimmed;
}

function readQuantifier(source: string, startIndex: number): { count: number; nextIndex: number } {
  if (source[startIndex] !== '{') {
    return { count: 1, nextIndex: startIndex };
  }

  let index = startIndex + 1;
  let digits = '';
  while (index < source.length && /\d/.test(source[index])) {
    digits += source[index];
    index += 1;
  }

  if (!digits || source[index] !== '}') {
    return { count: 1, nextIndex: startIndex };
  }

  return {
    count: Number(digits),
    nextIndex: index + 1
  };
}

function repeatToken(tokens: MaskToken[], token: MaskToken, count: number): void {
  const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 1;
  for (let i = 0; i < safeCount; i += 1) {
    if (token.kind === 'slot') {
      tokens.push({ kind: 'slot', test: token.test, placeholder: token.placeholder });
    } else {
      tokens.push({ kind: 'literal', value: token.value });
    }
  }
}

function parseRegexMask(pattern: string): ParsedMask | null {
  if (!pattern.trim()) return null;

  let source = normalizeRegexSource(pattern);
  if (source.startsWith('^')) source = source.slice(1);
  if (source.endsWith('$')) source = source.slice(0, -1);
  if (!source) return null;

  const tokens: MaskToken[] = [];

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (char === '\\') {
      const escaped = source[index + 1];
      if (!escaped) return null;

      let token: MaskToken;
      if (escaped === 'd') {
        token = { kind: 'slot', test: (value) => /^\d$/.test(value), placeholder: 'x' };
      } else if (escaped === 'w') {
        token = { kind: 'slot', test: (value) => /^\w$/.test(value), placeholder: 'x' };
      } else if (escaped === 's') {
        token = { kind: 'literal', value: ' ' };
      } else {
        token = { kind: 'literal', value: escaped };
      }

      const quantifier = readQuantifier(source, index + 2);
      repeatToken(tokens, token, quantifier.count);
      index = quantifier.nextIndex - 1;
      continue;
    }

    if (char === '[') {
      const endIndex = source.indexOf(']', index + 1);
      if (endIndex === -1) return null;
      const classContent = source.slice(index + 1, endIndex);
      if (!classContent) return null;

      const classRegex = new RegExp(`^[${classContent}]$`);
      const token: MaskToken = {
        kind: 'slot',
        test: (value) => classRegex.test(value),
        placeholder: 'x'
      };

      const quantifier = readQuantifier(source, endIndex + 1);
      repeatToken(tokens, token, quantifier.count);
      index = quantifier.nextIndex - 1;
      continue;
    }

    if (char === '.') {
      const token: MaskToken = {
        kind: 'slot',
        test: (value) => /^[\s\S]$/.test(value),
        placeholder: 'x'
      };
      const quantifier = readQuantifier(source, index + 1);
      repeatToken(tokens, token, quantifier.count);
      index = quantifier.nextIndex - 1;
      continue;
    }

    if (char === '+' || char === '*' || char === '?' || char === '{' || char === '}') {
      return null;
    }

    const token: MaskToken = { kind: 'literal', value: char };
    const quantifier = readQuantifier(source, index + 1);
    repeatToken(tokens, token, quantifier.count);
    index = quantifier.nextIndex - 1;
  }

  const placeholder = tokens
    .map((token) => (token.kind === 'literal' ? token.value : token.placeholder))
    .join('');

  return {
    source,
    tokens,
    placeholder
  };
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
  @property({ type: String, reflect: true }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) type = 'text';
  @property({ type: String, reflect: true }) autocomplete?: string;
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'label-position' }) labelPosition: 'floating' | 'above' = 'above';
  @property({ type: String, reflect: true }) regex = '';
  @property({ type: Boolean, attribute: 'show-regex-placeholder', reflect: true }) showRegexPlaceholder = false;
  @property({ type: Boolean, attribute: 'show-regex-placeholer', reflect: true }) showRegexPlaceholer = false;

  @query('input')
  private inputEl?: HTMLInputElement;

  private internals?: ElementInternals;
  private defaultValue?: string;
  private mask: ParsedMask | null = null;
  private isFocused = false;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.mask = parseRegexMask(this.regex);

    if (this.defaultValue === undefined) {
      const defaultAttrValue = this.getAttribute('value') ?? '';
      this.defaultValue = this.normalizeMaskedValue(defaultAttrValue);
    }

    this.value = this.normalizeMaskedValue(this.value);
    this.syncFormValue();
  }

  override willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('regex')) {
      this.mask = parseRegexMask(this.regex);
      this.defaultValue = this.normalizeMaskedValue(this.getAttribute('value') ?? '');
    }

    if (changed.has('showRegexPlaceholer') && this.showRegexPlaceholer) {
      this.showRegexPlaceholder = true;
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('regex')) {
      const normalized = this.normalizeMaskedValue(this.value);
      if (normalized !== this.value) {
        this.value = normalized;
        return;
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
    this.value = this.defaultValue ?? '';
  }

  formStateRestoreCallback(state: unknown): void {
    if (typeof state === 'string') {
      this.value = this.normalizeMaskedValue(state);
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  private normalizeMaskedValue(inputValue: string): string {
    if (!this.mask) return inputValue;

    const slotTokens = this.mask.tokens.filter(
      (token): token is Extract<MaskToken, { kind: 'slot' }> => token.kind === 'slot'
    );

    const collected: string[] = [];
    let slotIndex = 0;

    for (const char of inputValue) {
      if (slotIndex >= slotTokens.length) break;
      if (slotTokens[slotIndex].test(char)) {
        collected.push(char);
        slotIndex += 1;
      }
    }

    let formatted = '';
    let consumedSlots = 0;

    for (const token of this.mask.tokens) {
      if (token.kind === 'slot') {
        if (consumedSlots >= collected.length) {
          break;
        }
        formatted += collected[consumedSlots];
        consumedSlots += 1;
      } else {
        if (collected.length > 0 && consumedSlots <= collected.length) {
          formatted += token.value;
        }
      }
    }

    return formatted;
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
    const nextValue = this.normalizeMaskedValue(target.value);

    if (target.value !== nextValue) {
      target.value = nextValue;
    }

    this.value = nextValue;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private handleChange(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const nextValue = this.normalizeMaskedValue(target.value);

    if (target.value !== nextValue) {
      target.value = nextValue;
    }

    this.value = nextValue;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    const target = event.target as HTMLInputElement;
    const nextValue = this.normalizeMaskedValue(target.value);

    if (target.value !== nextValue) {
      target.value = nextValue;
    }

    this.value = nextValue;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleFocus(): void {
    this.isFocused = true;
    this.requestUpdate();
  }

  private handleBlur(): void {
    this.isFocused = false;
    this.requestUpdate();
  }

  override render() {
    const hasLabel = this.label.length > 0;
    const isFloating = hasLabel && this.labelPosition === 'floating';
    const hasValue = this.value.length > 0;

    const isRegexPlaceholderEnabled = (this.showRegexPlaceholder || this.showRegexPlaceholer) && this.mask !== null;
    const regexPlaceholder = isRegexPlaceholderEnabled ? this.mask?.placeholder : undefined;

    let effectivePlaceholder: string | undefined;
    if (isFloating) {
      effectivePlaceholder = isRegexPlaceholderEnabled && this.isFocused ? regexPlaceholder : undefined;
    } else if (isRegexPlaceholderEnabled) {
      effectivePlaceholder = regexPlaceholder;
    } else {
      effectivePlaceholder = this.placeholder || undefined;
    }

    const ariaLabel = this.label || effectivePlaceholder || this.placeholder || regexPlaceholder || undefined;

    return html`
      <div class="field ${isFloating ? 'floating' : ''}" data-has-value=${hasValue}>
        ${hasLabel ? html`<label for="input">${this.label}</label>` : null}
        <input
          id="input"
          part="input"
          .value=${this.value}
          .type=${this.type}
          .name=${this.name}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .placeholder=${effectivePlaceholder ?? ''}
          autocomplete=${ifDefined(this.autocomplete)}
          aria-label=${ifDefined(ariaLabel)}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
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
