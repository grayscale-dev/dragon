import Inputmask from 'inputmask/dist/inputmask.es6.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DUI_INPUT_MASK_PRESETS } from '../masks/presets.js';

function parseInputMaskConfig(value: string | null): Record<string, unknown> {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // Invalid JSON should not break the component.
  }

  return {};
}

@customElement('dui-mask-input')
export class DuiMaskInput extends LitElement {
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
  @property({ type: String, attribute: 'template-name' }) templateName = '';
  @property({ type: String }) mask = '';
  @property({ type: String, attribute: 'slot-char' }) slotChar = '_';
  @property({ type: Boolean, attribute: 'auto-clear' }) autoClear = true;
  @property({ type: Boolean }) unmask = true;
  @property({ type: String }) mode: 'decimal' | 'currency' | '' = '';
  @property({ type: String }) locale = '';
  @property({ type: String, attribute: 'locale-matcher' }) localeMatcher: 'lookup' | 'best fit' = 'best fit';
  @property({ type: String }) currency = '';
  @property({ type: String, attribute: 'currency-display' }) currencyDisplay: 'symbol' | 'code' | 'name' = 'symbol';
  @property({ type: Boolean, attribute: 'use-grouping' }) useGrouping = true;
  @property({ type: Number, attribute: 'min-fraction-digits' }) minFractionDigits?: number;
  @property({ type: Number, attribute: 'max-fraction-digits' }) maxFractionDigits?: number;
  @property({ type: Boolean, attribute: 'allow-empty' }) allowEmpty = true;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Boolean, attribute: 'read-only' }) readOnly = false;
  @property({ type: String, attribute: 'input-mode' }) inputMode = '';
  @property({ type: String }) pattern = '';
  @property({ type: Number }) size?: number;
  @property({ type: Boolean, attribute: 'auto-focus' }) autoFocus = false;
  @property({ type: String, attribute: 'input-id' }) inputId = '';
  @property({ type: String, reflect: true }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) type = 'text';
  @property({ type: String, reflect: true }) autocomplete?: string;
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'label-position' }) labelPosition: 'floating' | 'above' = 'above';
  @property({ type: String, attribute: 'input-mask' }) inputMask = '';
  @property({
    attribute: 'input-mask-config',
    converter: {
      fromAttribute: (value: string | null) => parseInputMaskConfig(value),
      toAttribute: (value: Record<string, unknown>) => {
        try {
          return JSON.stringify(value ?? {});
        } catch {
          return null;
        }
      }
    }
  })
  inputMaskConfig: Record<string, unknown> = {};

  @query('input')
  private inputEl?: HTMLInputElement;

  private internals?: ElementInternals;
  private defaultValue?: string;

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
    }

    this.syncFormValue();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('inputMask') || changed.has('inputMaskConfig') || changed.has('templateName') || changed.has('mask') || changed.has('mode') || changed.has('locale') || changed.has('localeMatcher') || changed.has('currency') || changed.has('currencyDisplay') || changed.has('useGrouping') || changed.has('minFractionDigits') || changed.has('maxFractionDigits') || changed.has('min') || changed.has('max') || changed.has('slotChar') || changed.has('autoClear') || changed.has('unmask') || changed.has('prefix') || changed.has('suffix') || changed.has('template')) {
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

  private isNumberModeEnabled(): boolean {
    return this.mode === 'decimal' || this.mode === 'currency';
  }

  private getLocaleSeparators(): { group: string; decimal: string } {
    const formatter = new Intl.NumberFormat(this.locale || undefined, {
      useGrouping: true,
      localeMatcher: this.localeMatcher
    });
    const parts = formatter.formatToParts(1000.1);
    return {
      group: parts.find((part) => part.type === 'group')?.value ?? ',',
      decimal: parts.find((part) => part.type === 'decimal')?.value ?? '.'
    };
  }

  private getCurrencyAffixes(): { prefix: string; suffix: string } {
    if (this.mode !== 'currency' || !this.currency) {
      return { prefix: '', suffix: '' };
    }

    const formatter = new Intl.NumberFormat(this.locale || undefined, {
      style: 'currency',
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      localeMatcher: this.localeMatcher,
      minimumFractionDigits: this.minFractionDigits,
      maximumFractionDigits: this.maxFractionDigits,
      useGrouping: this.useGrouping
    });

    const parts = formatter.formatToParts(1.1);
    const firstNumericIndex = parts.findIndex((part) => part.type === 'integer');
    const lastNumericIndex = parts
      .map((part, index) => ({ part, index }))
      .filter(({ part }) => ['integer', 'fraction'].includes(part.type))
      .map(({ index }) => index)
      .pop();

    if (firstNumericIndex === -1 || lastNumericIndex === undefined) {
      return { prefix: '', suffix: '' };
    }

    return {
      prefix: parts.slice(0, firstNumericIndex).map((part) => part.value).join(''),
      suffix: parts.slice(lastNumericIndex + 1).map((part) => part.value).join('')
    };
  }

  private getNumberModeMaskOptions(): Record<string, unknown> | null {
    if (!this.isNumberModeEnabled()) return null;

    const separators = this.getLocaleSeparators();
    const options: Record<string, unknown> = {
      alias: 'numeric',
      groupSeparator: this.useGrouping ? separators.group : '',
      autoGroup: this.useGrouping,
      radixPoint: separators.decimal,
      digitsOptional: true,
      rightAlign: false
    };

    if (typeof this.maxFractionDigits === 'number') {
      options.digits = this.maxFractionDigits;
      if (typeof this.minFractionDigits === 'number') {
        options.digitsOptional = this.minFractionDigits < this.maxFractionDigits;
      }
    } else if (typeof this.minFractionDigits === 'number') {
      options.digits = this.minFractionDigits;
      options.digitsOptional = false;
    }

    if (typeof this.min === 'number') {
      options.min = this.min;
    }

    if (typeof this.max === 'number') {
      options.max = this.max;
    }

    const currencyAffixes = this.getCurrencyAffixes();
    if (currencyAffixes.prefix) {
      options.prefix = currencyAffixes.prefix;
    }
    if (currencyAffixes.suffix) {
      options.suffix = currencyAffixes.suffix;
    }

    return options;
  }

  private parseNumberValue(rawValue: string): number | null {
    const value = rawValue.trim();
    if (!value) return null;

    const parsed = Number(value.replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : null;
  }

  private clampNumberValue(rawValue: string): string {
    if (!this.isNumberModeEnabled()) return rawValue;

    const parsed = this.parseNumberValue(rawValue);
    if (parsed === null) {
      return this.allowEmpty ? '' : '0';
    }

    let next = parsed;
    if (typeof this.min === 'number' && next < this.min) {
      next = this.min;
    }
    if (typeof this.max === 'number' && next > this.max) {
      next = this.max;
    }

    return String(next);
  }

  private adjustByStep(direction: 1 | -1): void {
    if (!this.isNumberModeEnabled() || this.disabled || this.readOnly) return;

    const current = this.parseNumberValue(this.value) ?? 0;
    const next = this.clampNumberValue(String(current + direction * this.step));
    this.value = next;

    if (this.inputEl) {
      this.inputEl.value = this.formatDisplayValue(next);
    }

    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private applyInputMaskValue(options: Record<string, unknown>, maskValue: string, force: boolean): void {
    if (!maskValue) return;

    if (force) {
      delete options.mask;
      delete options.alias;
    }

    if (typeof options.mask === 'string' || typeof options.alias === 'string') {
      return;
    }

    const looksLikePattern = /[9a*\[\]{}()]/i.test(maskValue);
    if (looksLikePattern) {
      options.mask = maskValue;
    } else {
      options.alias = maskValue;
    }
  }

  private getInputMaskOptions(): Record<string, unknown> | null {
    const preset = DUI_INPUT_MASK_PRESETS[this.templateName.trim()];
    const numberModeOptions = this.getNumberModeMaskOptions();

    const options = {
      ...(numberModeOptions ?? {}),
      ...(preset?.inputMaskConfig ?? {}),
      ...this.inputMaskConfig
    };

    if (options.placeholder === undefined && this.slotChar) {
      options.placeholder = this.slotChar;
    }

    if (options.clearIncomplete === undefined) {
      options.clearIncomplete = this.autoClear;
    }

    const customInputMask = (this.inputMask || this.mask).trim();
    const userProvidedMaskInConfig =
      typeof this.inputMaskConfig.mask === 'string' || typeof this.inputMaskConfig.alias === 'string';

    if (customInputMask) {
      this.applyInputMaskValue(options, customInputMask, !userProvidedMaskInConfig);
    } else if (preset?.inputMask) {
      this.applyInputMaskValue(options, preset.inputMask, true);
    }

    if (options.jitMasking === undefined) {
      options.jitMasking = false;
    }

    const hasMask = typeof options.mask === 'string' && options.mask.length > 0;
    const hasAlias = typeof options.alias === 'string' && options.alias.length > 0;
    return hasMask || hasAlias ? options : null;
  }

  private normalizeWithInputMask(inputValue: string): string {
    const options = this.getInputMaskOptions();
    if (!options) return inputValue;

    try {
      const formatted = Inputmask.format(inputValue, options);
      if (!this.unmask && !this.isNumberModeEnabled()) {
        return typeof formatted === 'string' ? formatted : inputValue;
      }

      const unmasked = Inputmask.unmask(formatted, options);
      return typeof unmasked === 'string' ? unmasked : inputValue;
    } catch {
      return inputValue;
    }
  }

  private formatWithInputMask(rawValue: string): string {
    const options = this.getInputMaskOptions();
    if (!options) return rawValue;

    try {
      const formatted = Inputmask.format(rawValue, options);
      return typeof formatted === 'string' ? formatted : rawValue;
    } catch {
      return rawValue;
    }
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
    const normalized = this.normalizeWithInputMask(this.stripAffixes(inputValue));
    return this.capToTemplate(this.clampNumberValue(normalized));
  }

  private normalizeFromUserInput(inputValue: string): string {
    const withoutAffixes = this.stripAffixes(inputValue);
    const templateValue = this.extractTemplateValue(withoutAffixes);
    const normalized = this.normalizeWithInputMask(templateValue);
    return this.capToTemplate(this.clampNumberValue(normalized));
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
    const innerValue = this.template ? this.applyTemplate(rawValue) : this.formatWithInputMask(rawValue);
    return `${this.prefix}${innerValue}${this.suffix}`;
  }

  private isMaskComplete(displayValue: string): boolean {
    const options = this.getInputMaskOptions();
    if (!options) return false;

    try {
      const inputmaskWithValidation = Inputmask as unknown as {
        isValid?: (value: string, options: Record<string, unknown>) => boolean;
      };
      return inputmaskWithValidation.isValid?.(displayValue, options) === true;
    } catch {
      return false;
    }
  }

  private handleFocus(event: FocusEvent): void {
    event.stopPropagation();
    this.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
  }

  private handleBlurForward(event: FocusEvent): void {
    event.stopPropagation();
    this.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
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

    if (this.isMaskComplete(displayValue)) {
      this.dispatchEvent(new Event('complete', { bubbles: true, composed: true }));
    }
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
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.adjustByStep(1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.adjustByStep(-1);
      return;
    }

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
    const inputId = this.inputId || 'input';

    return html`
      <div class="field ${isFloating ? 'floating' : ''}" data-has-value=${hasValue}>
        ${hasLabel ? html`<label for=${inputId}>${this.label}</label>` : null}
        <input
          id=${inputId}
          part="input"
          .value=${this.formatDisplayValue(this.value)}
          .type=${this.type}
          .name=${this.name}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readOnly}
          ?autofocus=${this.autoFocus}
          pattern=${ifDefined(this.pattern || undefined)}
          inputmode=${ifDefined(this.inputMode || undefined)}
          size=${ifDefined(this.size !== undefined ? String(this.size) : undefined)}
          .placeholder=${effectivePlaceholder ?? ''}
          autocomplete=${ifDefined(this.autocomplete)}
          aria-label=${ifDefined(ariaLabel)}
          @focus=${this.handleFocus}
          @blur=${this.handleBlurForward}
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
    'dui-mask-input': DuiMaskInput;
  }
}
