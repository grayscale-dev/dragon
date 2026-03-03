import { customElement } from 'lit/decorators.js';
import { DuiMaskInput } from './dui-mask-input.js';

@customElement('dui-currency-input')
export class DuiCurrencyInput extends DuiMaskInput {
  override connectedCallback(): void {
    this.mode = 'currency';
    if (!this.currency) {
      this.currency = 'USD';
    }
    if (this.minFractionDigits === undefined) {
      this.minFractionDigits = 2;
    }
    if (this.maxFractionDigits === undefined) {
      this.maxFractionDigits = 2;
    }
    super.connectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-currency-input': DuiCurrencyInput;
  }
}
