import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { DuiButtonGroup } from '../src/components/dui-button-group.js';
import '../src/index.ts';

function getButtons(group: DuiButtonGroup): HTMLElement[] {
  return Array.from(group.querySelectorAll('dui-button')) as HTMLElement[];
}

describe('<dui-button-group>', () => {
  it('merges three buttons with shared borders and edge radii', async () => {
    const group = await fixture<DuiButtonGroup>(html`
      <dui-button-group>
        <dui-button label="Left"></dui-button>
        <dui-button label="Center"></dui-button>
        <dui-button label="Right"></dui-button>
      </dui-button-group>
    `);
    await elementUpdated(group);

    const [first, middle, last] = getButtons(group);

    expect(first.style.getPropertyValue('--ui-button-radius')).to.include('0 0');
    expect(middle.style.getPropertyValue('--ui-button-radius')).to.equal('0px');
    expect(last.style.getPropertyValue('--ui-button-radius')).to.include('0 var(--ui-button-group-radius, 8px)');
    expect(first.style.getPropertyValue('margin-inline-start')).to.equal('0px');
    expect(middle.style.getPropertyValue('margin-inline-start')).to.equal(
      'calc(-1 * var(--ui-button-group-border-overlap, 1px))'
    );
  });

  it('keeps full radius when only one button exists', async () => {
    const group = await fixture<DuiButtonGroup>(html`
      <dui-button-group>
        <dui-button label="Only"></dui-button>
      </dui-button-group>
    `);
    await elementUpdated(group);

    const [only] = getButtons(group);
    expect(only.style.getPropertyValue('--ui-button-radius')).to.equal('var(--ui-button-group-radius, 8px)');
    expect(only.style.getPropertyValue('margin-inline-start')).to.equal('0px');
  });
});
