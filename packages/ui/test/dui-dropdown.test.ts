import { elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';
import type { DuiDropdown, DropdownOption } from '../src/components/dui-dropdown.js';
import '../src/index.ts';

const OPTIONS: DropdownOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pear', label: 'Pear' },
  { value: 'orange', label: 'Orange', disabled: true }
];

function getControl(el: DuiDropdown): HTMLElement {
  const control = el.shadowRoot?.querySelector('.control');
  if (!control) {
    throw new Error('Expected control element');
  }
  return control as HTMLElement;
}

function getSearchInput(el: DuiDropdown): HTMLInputElement {
  const input = el.shadowRoot?.querySelector('.search-input');
  if (!input) {
    throw new Error('Expected search input');
  }
  return input as HTMLInputElement;
}

describe('<dui-dropdown>', () => {

  it('supports above and floating labels', async () => {
    const el = await fixture<DuiDropdown>(html`<dui-dropdown label="Status" placeholder="Pick one" .options=${OPTIONS}></dui-dropdown>`);

    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).to.equal('Status');

    const field = el.shadowRoot?.querySelector('.field') as HTMLElement | null;
    expect(field?.classList.contains('floating')).to.equal(false);

    el.labelPosition = 'floating';
    await elementUpdated(el);

    expect(field?.classList.contains('floating')).to.equal(true);
    const placeholderText = el.shadowRoot?.querySelector('.single-value.placeholder')?.textContent?.trim();
    expect(placeholderText).to.equal('');

    el.value = 'apple';
    await elementUpdated(el);
    expect(field?.getAttribute('data-has-value')).to.equal('true');
  });

  it('opens and renders all options in non-searchable mode', async () => {
    const el = await fixture<DuiDropdown>(html`<dui-dropdown .options=${OPTIONS}></dui-dropdown>`);
    getControl(el).click();
    await elementUpdated(el);

    const options = el.shadowRoot?.querySelectorAll('.option');
    expect(options?.length).to.equal(OPTIONS.length);
  });

  it('filters options when searchable=true', async () => {
    const el = await fixture<DuiDropdown>(html`<dui-dropdown searchable .options=${OPTIONS}></dui-dropdown>`);
    getControl(el).click();
    await elementUpdated(el);

    const input = getSearchInput(el);
    input.value = 'pea';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementUpdated(el);

    const optionLabels = Array.from(el.shadowRoot?.querySelectorAll('.option span') ?? []).map((node) => node.textContent?.trim());
    expect(optionLabels).to.deep.equal(['Pear']);
  });

  it('selects one option in single-select mode and emits host events', async () => {
    const el = await fixture<DuiDropdown>(html`<dui-dropdown .options=${OPTIONS}></dui-dropdown>`);
    const observed: string[] = [];
    el.addEventListener('input', (event) => {
      observed.push((event.currentTarget as DuiDropdown).value);
    });

    getControl(el).click();
    await elementUpdated(el);

    const inputEventPromise = oneEvent(el, 'input');
    const changeEventPromise = oneEvent(el, 'change');

    const bananaOption = Array.from(el.shadowRoot?.querySelectorAll('.option') ?? []).find((node) => {
      return node.textContent?.includes('Banana');
    }) as HTMLButtonElement | undefined;

    expect(bananaOption).to.exist;
    bananaOption!.click();
    await elementUpdated(el);

    const inputEvent = await inputEventPromise;
    const changeEvent = await changeEventPromise;

    expect(el.value).to.equal('banana');
    expect(observed[observed.length - 1]).to.equal('banana');
    expect(inputEvent.bubbles).to.equal(true);
    expect(inputEvent.composed).to.equal(true);
    expect(changeEvent.bubbles).to.equal(true);
    expect(changeEvent.composed).to.equal(true);
  });

  it('supports multi-select chips and chip removal', async () => {
    const el = await fixture<DuiDropdown>(html`<dui-dropdown multi-select .options=${OPTIONS}></dui-dropdown>`);

    getControl(el).click();
    await elementUpdated(el);

    const optionButtons = Array.from(el.shadowRoot?.querySelectorAll('.option') ?? []) as HTMLButtonElement[];
    optionButtons[0]?.click();
    optionButtons[1]?.click();
    await elementUpdated(el);

    expect(el.values).to.deep.equal(['apple', 'banana']);
    expect(el.shadowRoot?.querySelectorAll('.chip').length).to.equal(2);

    const remove = el.shadowRoot?.querySelector('.chip-remove') as HTMLButtonElement;
    remove.click();
    await elementUpdated(el);

    expect(el.values).to.deep.equal(['banana']);
    expect(el.shadowRoot?.querySelectorAll('.chip').length).to.equal(1);
  });

  it('applies max-items-shown to panel max-height', async () => {
    const el = await fixture<DuiDropdown>(html`<dui-dropdown max-items-shown="3" .options=${OPTIONS}></dui-dropdown>`);

    getControl(el).click();
    await elementUpdated(el);

    const panel = el.shadowRoot?.querySelector('.panel') as HTMLElement | null;
    expect(panel).to.exist;
    expect(panel?.getAttribute('style')).to.contain('max-height: calc(3 * var(--ui-dropdown-option-height, 36px));');
  });
});
