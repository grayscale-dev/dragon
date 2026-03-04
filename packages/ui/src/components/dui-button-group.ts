import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('dui-button-group')
export class DuiButtonGroup extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    :host([block]) {
      display: block;
      width: 100%;
    }

    .group {
      display: inline-flex;
      align-items: stretch;
      width: auto;
    }

    :host([block]) .group {
      display: flex;
      width: 100%;
    }

    ::slotted(dui-button) {
      flex: 0 0 auto;
    }

    :host([block]) ::slotted(dui-button) {
      flex: 1 1 0;
    }
  `;

  @property({ type: Boolean, reflect: true }) block = false;

  @query('slot')
  private slotEl?: HTMLSlotElement;

  private readonly radiusValue = 'var(--ui-button-group-radius, 8px)';
  private readonly overlapValue = 'calc(-1 * var(--ui-button-group-border-overlap, 1px))';

  override firstUpdated(): void {
    this.applyGrouping();
  }

  private handleSlotChange(): void {
    this.applyGrouping();
  }

  private applyGrouping(): void {
    const assigned = this.slotEl?.assignedElements({ flatten: true }) ?? [];
    const buttons = assigned.filter((el) => el.tagName === 'DUI-BUTTON') as HTMLElement[];

    buttons.forEach((button, index) => {
      const isFirst = index === 0;
      const isLast = index === buttons.length - 1;

      button.style.setProperty('margin-inline-start', isFirst ? '0px' : this.overlapValue);

      if (buttons.length === 1) {
        button.style.setProperty('--ui-button-radius', this.radiusValue);
        return;
      }

      if (isFirst) {
        button.style.setProperty('--ui-button-radius', `${this.radiusValue} 0 0 ${this.radiusValue}`);
        return;
      }

      if (isLast) {
        button.style.setProperty('--ui-button-radius', `0 ${this.radiusValue} ${this.radiusValue} 0`);
        return;
      }

      button.style.setProperty('--ui-button-radius', '0px');
    });
  }

  override render() {
    return html`
      <div class="group" part="group">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-button-group': DuiButtonGroup;
  }
}
