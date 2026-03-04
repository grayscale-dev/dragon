import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from 'lit';
import type { DuiButton } from '../src/components/dui-button.js';
import '../src/index.ts';

function getButton(el: HTMLElement): HTMLButtonElement {
  const button = el.shadowRoot?.querySelector('button');
  if (!button) throw new Error('Expected internal button');
  return button as HTMLButtonElement;
}

function getBadge(el: HTMLElement): HTMLSpanElement {
  const badge = el.shadowRoot?.querySelector('.badge');
  if (!badge) throw new Error('Expected badge');
  return badge as HTMLSpanElement;
}

describe('<dui-button>', () => {
  it('reflects attributes to host and internal button', async () => {
    const el = await fixture<DuiButton>(
      html`<dui-button type="submit" name="intent" value="save" disabled>Save</dui-button>`
    );
    await elementUpdated(el);

    const button = getButton(el);
    expect(el.type).to.equal('submit');
    expect(el.name).to.equal('intent');
    expect(el.value).to.equal('save');
    expect(el.size).to.equal('md');
    expect(el.severity).to.equal('plain');
    expect(el.badgeSeverity).to.equal('plain');
    expect(button.disabled).to.equal(true);
    expect(button.getAttribute('part')).to.equal('button');
  });

  it('supports size presets', async () => {
    const el = await fixture<DuiButton>(html`<dui-button size="xs" label="Save"></dui-button>`);
    await elementUpdated(el);

    const button = getButton(el);
    expect(el.size).to.equal('xs');
    expect(el.getAttribute('size')).to.equal('xs');
    expect(getComputedStyle(button).fontSize).to.equal('12px');

    el.size = 'xl';
    await elementUpdated(el);
    expect(getComputedStyle(button).fontSize).to.equal('18px');
  });

  it('supports severity presets even when plain override tokens are set', async () => {
    const el = await fixture<DuiButton>(
      html`<dui-button
        severity="warning"
        style="--ui-button-bg: rgb(1, 2, 3); --ui-button-border: rgb(0, 0, 255)"
        label="Warn"
      ></dui-button>`
    );
    await elementUpdated(el);

    const button = getButton(el);
    expect(el.severity).to.equal('warning');
    expect(el.getAttribute('severity')).to.equal('warning');
    expect(getComputedStyle(button).backgroundColor).to.equal('rgb(245, 158, 11)');
    expect(getComputedStyle(button).borderTopColor).to.equal('rgb(245, 158, 11)');
  });

  it('renders badge as centered circle and expands to pill for longer text', async () => {
    const el = await fixture<DuiButton>(
      html`<dui-button
        label="Inbox"
        badge="7"
        badge-severity="danger"
        style="--ui-button-badge-bg: rgb(1, 2, 3); --ui-button-badge-border: rgb(0, 0, 0)"
      ></dui-button>`
    );
    await elementUpdated(el);

    const badge = getBadge(el);
    expect(el.badge).to.equal('7');
    expect(el.badgeSeverity).to.equal('danger');
    expect(badge.textContent?.trim()).to.equal('7');
    expect(getComputedStyle(badge).textAlign).to.equal('center');
    expect(getComputedStyle(badge).backgroundColor).to.equal('rgb(220, 38, 38)');
    expect(getComputedStyle(badge).borderTopColor).to.equal('rgb(220, 38, 38)');

    const shortRect = badge.getBoundingClientRect();
    expect(Math.round(shortRect.width)).to.equal(Math.round(shortRect.height));

    el.badge = '99+';
    await elementUpdated(el);

    const longRect = getBadge(el).getBoundingClientRect();
    expect(longRect.width).to.be.greaterThan(longRect.height);
  });

  it('supports ghost, outline, and round variants', async () => {
    const ghost = await fixture<DuiButton>(
      html`<dui-button variant="ghost" severity="danger" label="Ghost"></dui-button>`
    );
    await elementUpdated(ghost);
    const ghostButton = getButton(ghost);
    expect(getComputedStyle(ghostButton).backgroundColor).to.equal('rgba(0, 0, 0, 0)');

    const outline = await fixture<DuiButton>(
      html`<dui-button variant="outline" severity="danger" label="Outline"></dui-button>`
    );
    await elementUpdated(outline);
    const outlineButton = getButton(outline);
    expect(getComputedStyle(outlineButton).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(outlineButton).borderTopColor).to.equal('rgb(220, 38, 38)');

    const round = await fixture<DuiButton>(
      html`<dui-button variant="round" severity="plain" label="Round"></dui-button>`
    );
    await elementUpdated(round);
    const roundButton = getButton(round);
    expect(getComputedStyle(roundButton).borderRadius).to.equal('50%');
  });

  it('renders label attribute when slot is empty', async () => {
    const el = await fixture<DuiButton>(html`<dui-button label="Save"></dui-button>`);
    await elementUpdated(el);

    const button = getButton(el);
    expect(button.textContent?.trim()).to.equal('Save');
  });

  it('forwards focus() and blur() to internal button', async () => {
    const el = await fixture<DuiButton>(html`<dui-button>Save</dui-button>`);
    const button = getButton(el);

    el.focus();
    await nextFrame();
    expect(el.shadowRoot?.activeElement).to.equal(button);

    el.blur();
    await nextFrame();
    expect(el.shadowRoot?.activeElement).to.not.equal(button);
  });

  it('emits click event from host', async () => {
    const el = await fixture<DuiButton>(html`<dui-button>Save</dui-button>`);

    let clickEvent: MouseEvent | null = null;
    el.addEventListener('click', (event) => {
      clickEvent = event as MouseEvent;
    });

    el.click();
    await nextFrame();

    expect(clickEvent).to.exist;
    expect(clickEvent?.bubbles).to.equal(true);
    expect(clickEvent?.composed).to.equal(true);
    expect(clickEvent?.target).to.equal(el);
  });

  it('submits parent form when type="submit"', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <dui-button type="submit">Submit</dui-button>
      </form>
    `);

    const submitter = form.querySelector('dui-button') as DuiButton;
    let submitCount = 0;
    form.addEventListener('submit', (event) => {
      submitCount += 1;
      event.preventDefault();
    });

    submitter.click();
    await nextFrame();

    expect(submitCount).to.equal(1);
  });

  it('resets parent form when type="reset"', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <input name="field" value="seed" />
        <dui-button type="reset">Reset</dui-button>
      </form>
    `);

    const input = form.querySelector('input') as HTMLInputElement;
    const resetter = form.querySelector('dui-button') as DuiButton;
    input.value = 'changed';

    resetter.click();
    await nextFrame();

    expect(input.value).to.equal('seed');
  });
});
