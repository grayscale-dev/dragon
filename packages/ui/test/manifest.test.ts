import { expect } from '@open-wc/testing';
import { getManifest } from '../src/manifest/index.js';
import { ManifestSchema } from '../src/manifest/schema.js';

describe('component manifest', () => {
  it('passes zod schema validation', () => {
    const parsed = ManifestSchema.parse(getManifest());
    expect(parsed.version).to.equal(1);
    expect(parsed.package).to.equal('@grayscale-dev/dragon');
    expect(parsed.components.length).to.be.greaterThan(0);
  });

  it('ensures every builder control references an existing attribute/token', () => {
    const manifest = getManifest();

    for (const component of manifest.components) {
      const tokenNames = new Set(component.cssTokens.map((token) => token.name));
      const attributeNames = new Set(component.attributes.map((attribute) => attribute.name));

      for (const control of component.builder.controls) {
        if (control.kind === 'cssToken') {
          expect(tokenNames.has(control.ref), `${component.tag}: missing css token ref ${control.ref}`).to.equal(true);
        }

        if (control.kind === 'attribute') {
          expect(attributeNames.has(control.ref), `${component.tag}: missing attribute ref ${control.ref}`).to.equal(true);
        }
      }
    }
  });

  it('has unique css token names per component', () => {
    const manifest = getManifest();

    for (const component of manifest.components) {
      const names = component.cssTokens.map((token) => token.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size, `${component.tag}: duplicate css token names found`).to.equal(names.length);
    }
  });

  it('includes options for select attributes (label-position contract)', () => {
    const manifest = getManifest();
    const input = manifest.components.find((component) => component.tag === 'dui-input');
    expect(input, 'dui-input missing from manifest').to.exist;

    const selectAttributes = input!.attributes.filter((attribute) => attribute.control === 'select');
    expect(selectAttributes.length).to.be.greaterThan(0);

    for (const attribute of selectAttributes) {
      expect(attribute.options && attribute.options.length > 0, `${attribute.name} requires options`).to.equal(true);
    }

    const labelPosition = input!.attributes.find((attribute) => attribute.name === 'label-position');
    expect(labelPosition).to.exist;
    expect(labelPosition?.options?.map((option) => option.value)).to.deep.equal(['above', 'floating']);
  });

  it('matches the generated dist/manifest.json snapshot', async () => {
    const manifest = getManifest();
    const response = await fetch('/dist/manifest.json');
    expect(response.ok).to.equal(true);

    const generatedManifest = await response.json();
    expect(generatedManifest).to.deep.equal(manifest);
  });
});
