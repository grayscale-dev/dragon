import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('dui-button')
export class DuiButton extends LitElement {
  static readonly formAssociated = true;

  static override styles = css`
    :host {
      display: inline-block;
      --dui-button-size-padding: var(--ui-button-padding-md, 10px 16px);
      --dui-button-size-font-size: var(--ui-button-font-size-md, 14px);
      --dui-button-bg-default: var(--ui-button-plain-bg, var(--ui-button-bg, #111827));
      --dui-button-hover-bg-default: var(--ui-button-plain-hover-bg, var(--ui-button-hover-bg, #0f172a));
      --dui-button-active-bg-default: var(--ui-button-plain-active-bg, var(--ui-button-active-bg, #020617));
      --dui-button-color-default: var(--ui-button-plain-color, var(--ui-button-color, #ffffff));
      --dui-button-border-default: var(--ui-button-plain-border, var(--ui-button-border, #111827));
      --dui-button-soft-bg-default: var(--ui-button-plain-soft-bg, rgba(17, 24, 39, 0.1));
      --dui-button-soft-active-bg-default: var(--ui-button-plain-soft-active-bg, rgba(17, 24, 39, 0.18));
      --dui-button-border-applied: 1px solid var(--dui-button-border-default);
      --dui-button-radius-applied: var(--ui-button-radius, 8px);
      --dui-button-bg-applied: var(--dui-button-bg-default);
      --dui-button-hover-bg-applied: var(--dui-button-hover-bg-default);
      --dui-button-active-bg-applied: var(--dui-button-active-bg-default);
      --dui-button-color-applied: var(--dui-button-color-default);
      --dui-button-badge-bg-default: var(--ui-button-badge-plain-bg, var(--ui-button-badge-bg, #111827));
      --dui-button-badge-color-default: var(--ui-button-badge-plain-color, var(--ui-button-badge-color, #ffffff));
      --dui-button-badge-border-default: var(--ui-button-badge-plain-border, var(--ui-button-badge-border, #111827));
    }

    :host([severity='primary']) {
      --dui-button-bg-default: var(--ui-button-primary-bg, #2563eb);
      --dui-button-hover-bg-default: var(--ui-button-primary-hover-bg, #1d4ed8);
      --dui-button-active-bg-default: var(--ui-button-primary-active-bg, #1e40af);
      --dui-button-color-default: var(--ui-button-primary-color, #ffffff);
      --dui-button-border-default: var(--ui-button-primary-border, #2563eb);
      --dui-button-soft-bg-default: var(--ui-button-primary-soft-bg, rgba(37, 99, 235, 0.12));
      --dui-button-soft-active-bg-default: var(--ui-button-primary-soft-active-bg, rgba(37, 99, 235, 0.2));
    }

    :host([severity='secondary']) {
      --dui-button-bg-default: var(--ui-button-secondary-bg, #64748b);
      --dui-button-hover-bg-default: var(--ui-button-secondary-hover-bg, #475569);
      --dui-button-active-bg-default: var(--ui-button-secondary-active-bg, #334155);
      --dui-button-color-default: var(--ui-button-secondary-color, #ffffff);
      --dui-button-border-default: var(--ui-button-secondary-border, #64748b);
      --dui-button-soft-bg-default: var(--ui-button-secondary-soft-bg, rgba(100, 116, 139, 0.12));
      --dui-button-soft-active-bg-default: var(--ui-button-secondary-soft-active-bg, rgba(100, 116, 139, 0.2));
    }

    :host([severity='success']) {
      --dui-button-bg-default: var(--ui-button-success-bg, #16a34a);
      --dui-button-hover-bg-default: var(--ui-button-success-hover-bg, #15803d);
      --dui-button-active-bg-default: var(--ui-button-success-active-bg, #166534);
      --dui-button-color-default: var(--ui-button-success-color, #ffffff);
      --dui-button-border-default: var(--ui-button-success-border, #16a34a);
      --dui-button-soft-bg-default: var(--ui-button-success-soft-bg, rgba(22, 163, 74, 0.12));
      --dui-button-soft-active-bg-default: var(--ui-button-success-soft-active-bg, rgba(22, 163, 74, 0.2));
    }

    :host([severity='info']) {
      --dui-button-bg-default: var(--ui-button-info-bg, #0ea5e9);
      --dui-button-hover-bg-default: var(--ui-button-info-hover-bg, #0284c7);
      --dui-button-active-bg-default: var(--ui-button-info-active-bg, #0369a1);
      --dui-button-color-default: var(--ui-button-info-color, #ffffff);
      --dui-button-border-default: var(--ui-button-info-border, #0ea5e9);
      --dui-button-soft-bg-default: var(--ui-button-info-soft-bg, rgba(14, 165, 233, 0.12));
      --dui-button-soft-active-bg-default: var(--ui-button-info-soft-active-bg, rgba(14, 165, 233, 0.2));
    }

    :host([severity='warning']) {
      --dui-button-bg-default: var(--ui-button-warning-bg, #f59e0b);
      --dui-button-hover-bg-default: var(--ui-button-warning-hover-bg, #d97706);
      --dui-button-active-bg-default: var(--ui-button-warning-active-bg, #b45309);
      --dui-button-color-default: var(--ui-button-warning-color, #111827);
      --dui-button-border-default: var(--ui-button-warning-border, #f59e0b);
      --dui-button-soft-bg-default: var(--ui-button-warning-soft-bg, rgba(245, 158, 11, 0.18));
      --dui-button-soft-active-bg-default: var(--ui-button-warning-soft-active-bg, rgba(245, 158, 11, 0.28));
    }

    :host([severity='help']) {
      --dui-button-bg-default: var(--ui-button-help-bg, #a855f7);
      --dui-button-hover-bg-default: var(--ui-button-help-hover-bg, #9333ea);
      --dui-button-active-bg-default: var(--ui-button-help-active-bg, #7e22ce);
      --dui-button-color-default: var(--ui-button-help-color, #ffffff);
      --dui-button-border-default: var(--ui-button-help-border, #a855f7);
      --dui-button-soft-bg-default: var(--ui-button-help-soft-bg, rgba(168, 85, 247, 0.12));
      --dui-button-soft-active-bg-default: var(--ui-button-help-soft-active-bg, rgba(168, 85, 247, 0.2));
    }

    :host([severity='danger']) {
      --dui-button-bg-default: var(--ui-button-danger-bg, #dc2626);
      --dui-button-hover-bg-default: var(--ui-button-danger-hover-bg, #b91c1c);
      --dui-button-active-bg-default: var(--ui-button-danger-active-bg, #991b1b);
      --dui-button-color-default: var(--ui-button-danger-color, #ffffff);
      --dui-button-border-default: var(--ui-button-danger-border, #dc2626);
      --dui-button-soft-bg-default: var(--ui-button-danger-soft-bg, rgba(220, 38, 38, 0.12));
      --dui-button-soft-active-bg-default: var(--ui-button-danger-soft-active-bg, rgba(220, 38, 38, 0.2));
    }

        :host([badge-severity='primary']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-primary-bg, #2563eb);
      --dui-button-badge-color-default: var(--ui-button-badge-primary-color, #ffffff);
      --dui-button-badge-border-default: var(--ui-button-badge-primary-border, #2563eb);
    }

    :host([badge-severity='secondary']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-secondary-bg, #64748b);
      --dui-button-badge-color-default: var(--ui-button-badge-secondary-color, #ffffff);
      --dui-button-badge-border-default: var(--ui-button-badge-secondary-border, #64748b);
    }

    :host([badge-severity='success']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-success-bg, #16a34a);
      --dui-button-badge-color-default: var(--ui-button-badge-success-color, #ffffff);
      --dui-button-badge-border-default: var(--ui-button-badge-success-border, #16a34a);
    }

    :host([badge-severity='info']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-info-bg, #0ea5e9);
      --dui-button-badge-color-default: var(--ui-button-badge-info-color, #ffffff);
      --dui-button-badge-border-default: var(--ui-button-badge-info-border, #0ea5e9);
    }

    :host([badge-severity='warning']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-warning-bg, #f59e0b);
      --dui-button-badge-color-default: var(--ui-button-badge-warning-color, #111827);
      --dui-button-badge-border-default: var(--ui-button-badge-warning-border, #f59e0b);
    }

    :host([badge-severity='help']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-help-bg, #a855f7);
      --dui-button-badge-color-default: var(--ui-button-badge-help-color, #ffffff);
      --dui-button-badge-border-default: var(--ui-button-badge-help-border, #a855f7);
    }

    :host([badge-severity='danger']) {
      --dui-button-badge-bg-default: var(--ui-button-badge-danger-bg, #dc2626);
      --dui-button-badge-color-default: var(--ui-button-badge-danger-color, #ffffff);
      --dui-button-badge-border-default: var(--ui-button-badge-danger-border, #dc2626);
    }

:host([size='xs']) {
      --dui-button-size-padding: var(--ui-button-padding-xs, 6px 10px);
      --dui-button-size-font-size: var(--ui-button-font-size-xs, 12px);
    }

    :host([size='sm']) {
      --dui-button-size-padding: var(--ui-button-padding-sm, 8px 12px);
      --dui-button-size-font-size: var(--ui-button-font-size-sm, 13px);
    }

    :host([size='md']) {
      --dui-button-size-padding: var(--ui-button-padding-md, 10px 16px);
      --dui-button-size-font-size: var(--ui-button-font-size-md, 14px);
    }

    :host([size='lg']) {
      --dui-button-size-padding: var(--ui-button-padding-lg, 12px 18px);
      --dui-button-size-font-size: var(--ui-button-font-size-lg, 16px);
    }

    :host([size='xl']) {
      --dui-button-size-padding: var(--ui-button-padding-xl, 14px 22px);
      --dui-button-size-font-size: var(--ui-button-font-size-xl, 18px);
    }

    :host([variant='ghost']) {
      --dui-button-border-applied: var(--ui-button-ghost-border, 1px solid transparent);
      --dui-button-bg-applied: var(--ui-button-ghost-bg, transparent);
      --dui-button-hover-bg-applied: var(--ui-button-ghost-hover-bg, var(--dui-button-soft-bg-default));
      --dui-button-active-bg-applied: var(--ui-button-ghost-active-bg, var(--dui-button-soft-active-bg-default));
      --dui-button-color-applied: var(--ui-button-ghost-color, var(--dui-button-border-default));
    }

    :host([variant='outline']) {
      --dui-button-border-applied: var(--ui-button-outline-border, 1px solid var(--dui-button-border-default));
      --dui-button-bg-applied: var(--ui-button-outline-bg, transparent);
      --dui-button-hover-bg-applied: var(--ui-button-outline-hover-bg, var(--dui-button-soft-bg-default));
      --dui-button-active-bg-applied: var(--ui-button-outline-active-bg, var(--dui-button-soft-active-bg-default));
      --dui-button-color-applied: var(--ui-button-outline-color, var(--dui-button-border-default));
    }

    :host([variant='round']) {
      --dui-button-radius-applied: var(--ui-button-round-radius, 50%);
    }

    :host([block]) {
      display: block;
      width: 100%;
    }

    button {
      box-sizing: border-box;
      width: 100%;
      border: var(--dui-button-border-applied);
      border-radius: var(--dui-button-radius-applied);
      padding: var(--dui-button-size-padding, var(--ui-button-padding, 10px 16px));
      font-size: var(--dui-button-size-font-size, var(--ui-button-font-size, 14px));
      font-weight: var(--ui-button-font-weight, 600);
      background: var(--dui-button-bg-applied);
      color: var(--dui-button-color-applied);
      cursor: pointer;
      line-height: 1.2;
      transition: background-color 120ms ease, box-shadow 120ms ease, transform 80ms ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ui-button-content-gap, 8px);
    }

    .content {
      display: inline-flex;
      align-items: center;
      gap: var(--ui-button-content-gap, 8px);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: auto;
      height: var(--ui-button-badge-size, 18px);
      min-width: var(--ui-button-badge-size, 18px);
      padding-inline: var(--ui-button-badge-padding-inline, 4px);
      border-radius: 9999px;
      font-size: var(--ui-button-badge-font-size, 11px);
      font-weight: var(--ui-button-badge-font-weight, 600);
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      background: var(--dui-button-badge-bg-default);
      color: var(--dui-button-badge-color-default);
      border: 1px solid var(--dui-button-badge-border-default);
    }

    :host(:not([block])) button {
      width: auto;
      min-width: var(--ui-button-min-width, 0px);
    }

    button:hover:not(:disabled) {
      background: var(--dui-button-hover-bg-applied);
    }

    button:active:not(:disabled) {
      background: var(--dui-button-active-bg-applied);
      transform: translateY(1px);
    }

    button:focus-visible {
      outline: none;
      box-shadow: var(--ui-button-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.35));
    }

    button:disabled {
      opacity: var(--ui-button-disabled-opacity, 0.55);
      cursor: not-allowed;
    }
  `;

  @property({ type: String, reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) badge = '';
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: String, reflect: true }) severity:
    | 'plain'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'help'
    | 'danger' = 'plain';
  @property({ type: String, reflect: true }) variant: 'standard' | 'ghost' | 'outline' | 'round' = 'standard';
  @property({ type: String, attribute: 'badge-severity', reflect: true }) badgeSeverity:
    | 'plain'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'help'
    | 'danger' = 'plain';
  @property({ type: Boolean, reflect: true }) block = false;

  @query('button')
  private buttonEl?: HTMLButtonElement;

  private internals?: ElementInternals;
  private performingFormAction = false;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this.internals = this.attachInternals();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncFormValue();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('name') || changed.has('value') || changed.has('disabled')) {
      this.syncFormValue();
    }
  }

  override focus(options?: FocusOptions): void {
    this.buttonEl?.focus(options);
  }

  override blur(): void {
    this.buttonEl?.blur();
  }

  override click(): void {
    this.buttonEl?.click();
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

    this.internals.setFormValue(this.value);
  }

  private handleClick(event: MouseEvent): void {
    event.stopPropagation();

    const forwardedClick = new MouseEvent('click', {
      bubbles: true,
      composed: true,
      cancelable: true,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey
    });

    const notCancelled = this.dispatchEvent(forwardedClick);
    if (!notCancelled || this.disabled || this.type === 'button') return;

    queueMicrotask(() => {
      if (this.performingFormAction) return;
      const form = this.internals?.form ?? this.closest('form');
      if (!form) return;

      this.performingFormAction = true;
      try {
        if (this.type === 'submit') {
          form.requestSubmit();
          return;
        }

        if (this.type === 'reset') {
          form.reset();
        }
      } finally {
        this.performingFormAction = false;
      }
    });
  }

  override render() {
    const hasBadge = this.badge.length > 0;

    return html`
      <button
        part="button"
        type="button"
        name=${this.name}
        value=${this.value}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <span class="content">
          <slot>${this.label}</slot>
          ${hasBadge ? html`<span class="badge" part="badge">${this.badge}</span>` : null}
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dui-button': DuiButton;
  }
}
