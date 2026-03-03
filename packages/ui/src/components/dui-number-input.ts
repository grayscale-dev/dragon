import { customElement } from 'lit/decorators.js';
import { DuiMaskInput } from './dui-mask-input.js';

@customElement('dui-number-input')
export class DuiNumberInput extends DuiMaskInput {
  override connectedCallback(): void {
    if (!this.mode) {
      this.mode = 'decimal';
    }
    super.connectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-number-input': DuiNumberInput;
  }
}
