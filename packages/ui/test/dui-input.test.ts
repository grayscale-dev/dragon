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
    const input = getInput(el);
    expect(input.value).to.equal('hello');
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

  it('dispatches input events from the host with bubbles + composed', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);
    let currentTargetValue = '';
    el.addEventListener('input', (event) => {
      currentTargetValue = (event.currentTarget as any).value;
    });
    const listener = oneEvent(el, 'input');
    input.value = 'a';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    const event = await listener;
    expect(event.bubbles).to.equal(true);
    expect(event.composed).to.equal(true);
    expect(currentTargetValue).to.equal('a');
  });

  it('dispatches change events from the host with bubbles + composed', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);
    let currentTargetValue = '';
    el.addEventListener('change', (event) => {
      currentTargetValue = (event.currentTarget as any).value;
    });
    const listener = oneEvent(el, 'change');
    input.value = 'b';
    input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    const event = await listener;
    expect(event.bubbles).to.equal(true);
    expect(event.composed).to.equal(true);
    expect(currentTargetValue).to.equal('b');
  });

  it('dispatches change event on Enter key', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);
    let currentTargetValue = '';
    el.addEventListener('change', (event) => {
      currentTargetValue = (event.currentTarget as any).value;
    });
    const listener = oneEvent(el, 'change');
    input.value = 'enter';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await listener;
    expect(currentTargetValue).to.equal('enter');
  });

  it('reflects disabled + required + type + name + placeholder + autocomplete to internal input', async () => {
    const el = await fixture<DuiInput>(html`
      <dui-input
        name="email"
        placeholder="Email"
        autocomplete="email"
        type="email"
        required
        disabled
      ></dui-input>
    `);
    await elementUpdated(el);
    const input = getInput(el);
    expect(input.disabled).to.equal(true);
    expect(input.required).to.equal(true);
    expect(input.name).to.equal('email');
    expect(input.placeholder).to.equal('Email');
    expect(input.autocomplete).to.equal('email');
    expect(input.type).to.equal('email');
  });

  it('hides placeholder text when label position is floating', async () => {
    const el = await fixture<DuiInput>(html`
      <dui-input label="Email" label-position="floating" placeholder="Email address"></dui-input>
    `);
    await elementUpdated(el);
    const input = getInput(el);
    expect(input.placeholder).to.equal('');
  });

  it('supports full regex operators like * for digit-only input', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    el.regex = '^\\d*$';
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12a34';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234');
    expect(input.value).to.equal('1234');
  });

  it('applies template literals and fills x slots with typed values', async () => {
    const el = await fixture<DuiInput>(html`<dui-input template="(xxx) xxx-xxxx"></dui-input>`);
    el.regex = '^\\d*$';
    await elementUpdated(el);

    const input = getInput(el);
    expect(input.value).to.equal('(xxx) xxx-xxxx');

    input.value = '(xxx) xxx-xxxx8';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('8');
    expect(input.value).to.equal('(8xx) xxx-xxxx');
  });

  it('keeps regex enforcement with template plus prefix/suffix', async () => {
    const el = await fixture<DuiInput>(html`<dui-input template="(xxx) xxx-xxxx" prefix="$" suffix="px"></dui-input>`);
    el.regex = '^\\d*$';
    await elementUpdated(el);

    const input = getInput(el);
    expect(input.value).to.equal('$(xxx) xxx-xxxxpx');

    input.value = '$(12a) xxx-xxxxpx';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('12');
    expect(input.value).to.equal('$(12x) xxx-xxxxpx');
  });

  it('displays prefix and suffix while keeping host value unwrapped', async () => {
    const el = await fixture<DuiInput>(html`<dui-input prefix="$" suffix="px" value="23"></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    expect(el.value).to.equal('23');
    expect(input.value).to.equal('$23px');

    input.value = '$45px';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('45');
    expect(input.value).to.equal('$45px');
  });

  it('keeps prefix and suffix visible when value is empty', async () => {
    const el = await fixture<DuiInput>(html`<dui-input prefix="$" suffix="px"></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    expect(el.value).to.equal('');
    expect(input.value).to.equal('$px');
  });

  it('applies regex masking to user input even with prefix/suffix', async () => {
    const el = await fixture<DuiInput>(html`<dui-input prefix="$" suffix="px"></dui-input>`);
    el.regex = '^\\d*$';
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '$12a3px';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('123');
    expect(input.value).to.equal('$123px');
  });

  it('forwards focus and blur to the internal input', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);
    el.focus();
    await nextFrame();
    expect(el.shadowRoot?.activeElement).to.equal(input);

    el.blur();
    await nextFrame();
    expect(el.shadowRoot?.activeElement).to.not.equal(input);
  });

  it('exposes part="input" for styling', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);
    expect(input.getAttribute('part')).to.equal('input');
  });

  describe('form-associated behavior', () => {
    const supportsFA =
      'ElementInternals' in window &&
      'attachInternals' in document.createElement('dui-input');

    it('contributes value to FormData when supported', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <dui-input name="field" value="seed"></dui-input>
        </form>
      `);
      const el = form.querySelector('dui-input') as DuiInput;
      await elementUpdated(el);
      const data = new FormData(form);

      if (supportsFA) {
        expect(data.get('field')).to.equal('seed');
      } else {
        expect(data.get('field')).to.equal(null);
      }
    });

    it('resets to the default value on form reset when supported', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <dui-input name="field" value="seed"></dui-input>
        </form>
      `);
      const el = form.querySelector('dui-input') as DuiInput;
      el.value = 'changed';
      await elementUpdated(el);
      form.reset();
      await elementUpdated(el);

      if (supportsFA) {
        expect(el.value).to.equal('seed');
      } else {
        expect(el.value).to.equal('changed');
      }
    });
  });
});
