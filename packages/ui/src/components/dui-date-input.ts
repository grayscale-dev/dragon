import { customElement } from 'lit/decorators.js';
import { DuiMaskInput } from './dui-mask-input.js';

@customElement('dui-date-input')
export class DuiDateInput extends DuiMaskInput {
  override connectedCallback(): void {
    if (!this.inputMask && !this.mask) {
      this.inputMask = '9999-99-99';
    }
    if (!this.placeholder) {
      this.placeholder = 'YYYY-MM-DD';
    }
    super.connectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-date-input': DuiDateInput;
  }
}
