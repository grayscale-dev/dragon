# Dragon UI

Framework-agnostic Web Components built with Lit. Currently includes `<dui-input>`.

**Build**

```bash
npm install
npm --workspace packages/ui run build
```

**Manifest Build**

```bash
npm --workspace packages/ui run build:manifest
```

`build` always generates `dist/manifest.json` and validates it with zod.

**Unit Tests**

```bash
npm --workspace packages/ui run test
```

Covers value/property sync, native `input`/`change` events, form association, focus forwarding, styling hooks, masking behavior, and manifest integrity.

**Usage (Vanilla)**

```html
<script type="module">
  import '@grayscale-dev/dragon';
</script>

<dui-input id="name" label="Name" label-position="above"></dui-input>
<dui-input id="email" label="Email" label-position="floating"></dui-input>

<script type="module">
  const el = document.querySelector('#name');
  el.addEventListener('input', (e) => {
    console.log(e.currentTarget.value);
  });
</script>
```

**Usage (React)**

```tsx
import '@grayscale-dev/dragon';

export function Demo() {
  return (
    <dui-input
      label="Email"
      label-position="floating"
      onInput={(e) => {
        const el = e.currentTarget as HTMLInputElement & { value: string };
        console.log(el.value);
      }}
    />
  );
}
```

**Usage (Vue)**

```vue
<script setup lang="ts">
import '@grayscale-dev/dragon';

function handleInput(e: Event) {
  const el = e.currentTarget as HTMLInputElement & { value: string };
  console.log(el.value);
}
</script>

<template>
  <dui-input label="Email" label-position="floating" @input="handleInput" />
</template>
```

**Manifest Consumption**

Machine-readable docs/theme-builder metadata is exported at `@grayscale-dev/dragon/manifest`.

```ts
import manifest from '@grayscale-dev/dragon/manifest';

for (const component of manifest.components) {
  console.log(component.tag, component.cssTokens.length);
}
```

Generate docs/theme controls from this manifest only, so package metadata remains your single source of truth.

**Metadata Files**

- `dist/manifest.json`: Dragon UI docs/theme-builder metadata (tokens, controls, builder groups, option enums).
- `custom-elements.json`: optional Web Components API standard file (not currently generated in this package).

**Styling**

CSS custom properties:

- `--ui-input-padding`
- `--ui-input-font-size`
- `--ui-input-border`
- `--ui-input-radius`
- `--ui-input-bg`
- `--ui-input-color`
- `--ui-input-placeholder-color`
- `--ui-input-focus-ring`
- `--ui-input-label-font-size`
- `--ui-input-label-color`
- `--ui-input-floating-label-left`
- `--ui-input-floating-padding-top`
- `--ui-input-floating-padding-right`
- `--ui-input-floating-padding-bottom`
- `--ui-input-floating-padding-left`

Default size values in `<dui-input>` are pixel-based.

Example:

```css
dui-input {
  --ui-input-padding: 12px 16px;
  --ui-input-border: 1px solid #94a3b8;
  --ui-input-radius: 999px;
  --ui-input-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.35);
  --ui-input-label-font-size: 14px;
}

dui-input::part(input) {
  font-weight: 600;
}
```

**Labels**

`label` and `label-position` control the built-in label:

- `label-position="above"` (default): label sits above the field.
- `label-position="floating"`: label sits like a placeholder and floats to the top-left on focus or when the input has a value.
- Floating mode hides placeholder text to avoid overlap with the label.

**Affixes**

Use `prefix` and `suffix` to show fixed text around the user value.

- Affixes are always displayed in the input.
- Input masking still applies to what the user types (`value` stays unprefixed/unsuffixed).

Example:

```html
<dui-input label="Amount" prefix="$" input-mask="9{1,10}"></dui-input>
<dui-input label="Width" suffix="px" input-mask="9{1,10}"></dui-input>
```

**Preset Templates**

Use `template-name` for built-in mask presets, then override with `input-mask`/`input-mask-config` for edge cases.

Available presets:

- `phone-us`
- `phone-intl`
- `ssn`
- `ein`
- `zip-us`
- `zip-plus4-us`
- `credit-card`
- `cvv`
- `expiry`
- `date-iso`
- `time-24h`
- `currency-usd`

Example:

```html
<dui-input template-name="phone-us"></dui-input>
<dui-input template-name="currency-usd"></dui-input>
```

**Template Masks**

Use `template` to keep literal characters visible while `x` positions are filled by the typed value.

- `x` = value slot
- Non-`x` characters stay visible in the field
- Works with `input-mask`, `prefix`, and `suffix`

Example:

```html
<dui-input
  label="Phone"
  template="(xxx) xxx-xxxx"
  input-mask="9{1,10}"
></dui-input>
```

Typing `8` shows `(8xx) xxx-xxxx`.

**Masking**

`input-mask` uses the Inputmask pattern syntax.

- Example 4 digits: `9999`
- Example 1-10 digits: `9{1,10}`
- Example phone shape: `(999) 999-9999`
- As the user types, input is constrained by the mask.

Example:

```html
<dui-input
  label="Phone"
  label-position="floating"
  input-mask="(999) 999-9999"
></dui-input>
```

`input-mask-config` passes Inputmask options. You can set it as JSON attribute or as a property object.

```html
<dui-input
  input-mask="decimal"
  input-mask-config='{"alias":"numeric","groupSeparator":",","autoGroup":true,"digits":2,"radixPoint":".","prefix":"$ ","removeMaskOnSubmit":true}'
></dui-input>
```

```ts
const el = document.querySelector('dui-input');
el.inputMask = 'decimal';
el.inputMaskConfig = {
  alias: 'numeric',
  groupSeparator: ',',
  autoGroup: true,
  digits: 2,
  radixPoint: '.',
  prefix: '$ ',
  removeMaskOnSubmit: true
};
```

**InputNumber-Like Options**

`dui-input` supports most PrimeReact-style number props (without spinner buttons):

- `mode="decimal|currency"`
- `locale`, `locale-matcher`
- `currency`, `currency-display`
- `use-grouping`
- `min-fraction-digits`, `max-fraction-digits`
- `min`, `max`, `step`
- `allow-empty`

Example:

```html
<dui-input
  mode="currency"
  currency="USD"
  locale="en-US"
  use-grouping
  min-fraction-digits="2"
  max-fraction-digits="2"
  min="0"
  step="0.25"
></dui-input>
```

Press `ArrowUp` / `ArrowDown` to increment/decrement by `step` in number mode.

**Form Behavior**

`<dui-input>` dispatches native `input` and `change` events (bubbling + composed) and exposes a `value` property on the custom element. It also integrates with forms via the Form-Associated Custom Elements API where supported.
