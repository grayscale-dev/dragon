import { fixture, expect, oneEvent, elementUpdated, nextFrame } from '@open-wc/testing';
import { html } from 'lit';
import type { DuiInput } from '../src/components/dui-input.js';
import '../src/index.ts';

function getInput(el: HTMLElement): HTMLInputElement {
  const input = el.shadowRoot?.querySelector('input');
  if (!input) {
    throw new Error('Expected internal input');
  }
  return input as HTMLInputElement;
}

describe('<dui-input>', () => {
  it('syncs property value -> internal input value', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    el.value = 'hello';
    await elementUpdated(el);
    expect(getInput(el).value).to.equal('hello');
  });

  it('syncs internal input value -> property value', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);
    input.value = 'typed';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);
    expect(el.value).to.equal('typed');
  });

  it('initializes from value attribute', async () => {
    const el = await fixture<DuiInput>(html`<dui-input value="seed"></dui-input>`);
    await elementUpdated(el);
    expect(el.value).to.equal('seed');
    expect(getInput(el).value).to.equal('seed');
  });

  it('dispatches input and change events from host', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);

    const inputListener = oneEvent(el, 'input');
    input.value = 'a';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    const inputEvent = await inputListener;
    expect(inputEvent.bubbles).to.equal(true);
    expect(inputEvent.composed).to.equal(true);

    const changeListener = oneEvent(el, 'change');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    const changeEvent = await changeListener;
    expect(changeEvent.bubbles).to.equal(true);
    expect(changeEvent.composed).to.equal(true);
  });

  it('forwards focus and blur events', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);

    const focusEventPromise = oneEvent(el, 'focus');
    input.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
    await focusEventPromise;

    const blurEventPromise = oneEvent(el, 'blur');
    input.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
    await blurEventPromise;
  });

  it('forwards focus() and blur() calls to internal input', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);

    el.focus();
    await nextFrame();
    expect(el.shadowRoot?.activeElement).to.equal(input);

    el.blur();
    await nextFrame();
    expect(el.shadowRoot?.activeElement).to.not.equal(input);
  });

  it('reflects native attrs and part', async () => {
    const el = await fixture<DuiInput>(html`
      <dui-input name="email" placeholder="Email" autocomplete="email" type="email" required disabled></dui-input>
    `);
    await elementUpdated(el);

    const input = getInput(el);
    expect(input.disabled).to.equal(true);
    expect(input.required).to.equal(true);
    expect(input.name).to.equal('email');
    expect(input.placeholder).to.equal('Email');
    expect(input.autocomplete).to.equal('email');
    expect(input.type).to.equal('email');
    expect(input.getAttribute('part')).to.equal('input');
  });

  describe('form-associated behavior', () => {
    const supportsFA = 'ElementInternals' in window && 'attachInternals' in document.createElement('dui-input');

    it('contributes value to FormData when supported', async () => {
      const form = await fixture<HTMLFormElement>(html`<form><dui-input name="field" value="seed"></dui-input></form>`);
      const el = form.querySelector('dui-input') as DuiInput;
      await elementUpdated(el);
      const data = new FormData(form);

      if (supportsFA) {
        expect(data.get('field')).to.equal('seed');
      } else {
        expect(data.get('field')).to.equal(null);
      }
    });
  });
});
