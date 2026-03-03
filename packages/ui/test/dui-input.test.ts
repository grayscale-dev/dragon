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

  it('applies input-mask filtering for digit-only input', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    el.inputMask = '9{1,10}';
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12a34';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234');
    expect(input.value).to.equal('1234');
  });

  it('supports inputMaskConfig as a property object', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    el.inputMaskConfig = { mask: '9{1,4}' };
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12a34';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234');
    expect(input.value).to.equal('1234');
  });

  it('supports input-mask-config as JSON attribute', async () => {
    const el = await fixture<DuiInput>(html`<dui-input input-mask-config='{"mask":"9{1,3}"}'></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12a34';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('123');
    expect(input.value).to.equal('123');
  });

  it('applies advanced Inputmask options from inputMaskConfig', async () => {
    const el = await fixture<DuiInput>(html`<dui-input input-mask="decimal"></dui-input>`);
    el.inputMaskConfig = {
      alias: 'numeric',
      groupSeparator: ',',
      autoGroup: true,
      digits: 2,
      radixPoint: '.',
      prefix: '$ ',
      removeMaskOnSubmit: true
    };
    el.value = '1234.5';
    await elementUpdated(el);

    const input = getInput(el);
    expect(input.value.startsWith('$')).to.equal(true);

    input.value = '$ 12a3.4';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value.includes('a')).to.equal(false);
  });

  it('supports template-name preset masks', async () => {
    const el = await fixture<DuiInput>(html`<dui-input template-name="phone-us"></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '1234567890';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234567890');
    expect(input.value).to.equal('(123) 456-7890');
  });

  it('lets explicit input-mask override template-name preset', async () => {
    const el = await fixture<DuiInput>(html`<dui-input template-name="phone-us" input-mask="9999"></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '123456';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('1234');
    expect(input.value).to.equal('1234');
  });

  it('supports mask property alias and slot-char', async () => {
    const el = await fixture<DuiInput>(html`<dui-input mask="99/99" slot-char="_"></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    input.value = '12';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(input.value).to.equal('12/__');
  });

  it('dispatches complete event when mask is fully satisfied', async () => {
    const el = await fixture<DuiInput>(html`<dui-input input-mask="99/99"></dui-input>`);
    await elementUpdated(el);

    const input = getInput(el);
    const listener = oneEvent(el, 'complete');

    input.value = '1234';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    const event = await listener;
    expect(event.bubbles).to.equal(true);
    expect(event.composed).to.equal(true);
  });

  it('supports number mode formatting and step keyboard control', async () => {
    const el = await fixture<DuiInput>(html`<dui-input mode="currency" currency="USD" locale="en-US"></dui-input>`);
    el.value = '12.5';
    el.step = 0.5;
    await elementUpdated(el);

    const input = getInput(el);
    expect(input.value.includes('$')).to.equal(true);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }));
    await elementUpdated(el);
    expect(Number(el.value)).to.equal(13);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await elementUpdated(el);
    expect(Number(el.value)).to.equal(12.5);
  });

  it('applies template literals and fills x slots with typed values', async () => {
    const el = await fixture<DuiInput>(html`<dui-input template="(xxx) xxx-xxxx"></dui-input>`);
    el.inputMask = '9{1,10}';
    await elementUpdated(el);

    const input = getInput(el);
    expect(input.value).to.equal('(xxx) xxx-xxxx');

    input.value = '(xxx) xxx-xxxx8';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    expect(el.value).to.equal('8');
    expect(input.value).to.equal('(8xx) xxx-xxxx');
  });

  it('keeps input-mask enforcement with template plus prefix/suffix', async () => {
    const el = await fixture<DuiInput>(html`<dui-input template="(xxx) xxx-xxxx" prefix="$" suffix="px"></dui-input>`);
    el.inputMask = '9{1,10}';
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

  it('applies input-mask filtering to user input even with prefix/suffix', async () => {
    const el = await fixture<DuiInput>(html`<dui-input prefix="$" suffix="px"></dui-input>`);
    el.inputMask = '9{1,10}';
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

  it('forwards focus and blur events from internal input', async () => {
    const el = await fixture<DuiInput>(html`<dui-input></dui-input>`);
    const input = getInput(el);

    const focusEventPromise = oneEvent(el, 'focus');
    input.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
    const focusEvent = await focusEventPromise;
    expect(focusEvent.bubbles).to.equal(true);

    const blurEventPromise = oneEvent(el, 'blur');
    input.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
    const blurEvent = await blurEventPromise;
    expect(blurEvent.bubbles).to.equal(true);
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
