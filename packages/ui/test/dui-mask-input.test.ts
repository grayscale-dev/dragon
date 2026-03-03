import { fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { DuiMaskInput } from '../src/components/dui-mask-input.js';
import type { DuiCurrencyInput } from '../src/components/dui-currency-input.js';
import type { DuiDateInput } from '../src/components/dui-date-input.js';
import type { DuiNumberInput } from '../src/components/dui-number-input.js';
import '../src/index.ts';

function getInput(el: HTMLElement): HTMLInputElement {
  const input = el.shadowRoot?.querySelector('input');
  if (!input) throw new Error('Expected internal input');
  return input as HTMLInputElement;
}

describe('<dui-mask-input>', () => {
  it('applies input mask filtering', async () => {
    const el = await fixture<DuiMaskInput>(html`<dui-mask-input input-mask="9{1,10}"></dui-mask-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12a34';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234');
    expect(input.value).to.equal('1234');
  });

  it('supports preset template names', async () => {
    const el = await fixture<DuiMaskInput>(html`<dui-mask-input template-name="phone-us"></dui-mask-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '1234567890';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234567890');
    expect(input.value).to.equal('(123) 456-7890');
  });

  it('supports input-mask-config', async () => {
    const el = await fixture<DuiMaskInput>(html`<dui-mask-input input-mask-config='{"mask":"9{1,3}"}'></dui-mask-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12a34';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('123');
  });

  it('supports template with x placeholders', async () => {
    const el = await fixture<DuiMaskInput>(html`<dui-mask-input template="(xxx) xxx-xxxx" input-mask="9{1,10}"></dui-mask-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '(xxx) xxx-xxxx8';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('8');
    expect(input.value).to.equal('(8xx) xxx-xxxx');
  });

  it('supports affixes', async () => {
    const el = await fixture<DuiMaskInput>(html`<dui-mask-input prefix="$" suffix="px" value="23"></dui-mask-input>`);
    await elementUpdated(el);
    const input = getInput(el);
    expect(input.value).to.equal('$23px');
  });

  it('dispatches complete when mask is satisfied', async () => {
    const el = await fixture<DuiMaskInput>(html`<dui-mask-input input-mask="99/99"></dui-mask-input>`);
    await elementUpdated(el);
    const input = getInput(el);
    const complete = oneEvent(el, 'complete');
    input.value = '1234';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await complete;
  });
});

describe('specialized inputs', () => {
  it('<dui-number-input> defaults to decimal mode and supports step keys', async () => {
    const el = await fixture<DuiNumberInput>(html`<dui-number-input value="12" step="0.5"></dui-number-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }));
    await elementUpdated(el);
    expect(Number(el.value)).to.equal(12.5);
  });

  it('<dui-currency-input> defaults currency formatting', async () => {
    const el = await fixture<DuiCurrencyInput>(html`<dui-currency-input value="1234.5" locale="en-US"></dui-currency-input>`);
    await elementUpdated(el);
    expect(getInput(el).value.includes('$')).to.equal(true);
  });

  it('<dui-date-input> defaults to YYYY-MM-DD mask', async () => {
    const el = await fixture<DuiDateInput>(html`<dui-date-input></dui-date-input>`);
    await elementUpdated(el);
    expect(getInput(el).placeholder).to.equal('YYYY-MM-DD');
  });
});
