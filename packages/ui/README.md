# Dragon UI

Framework-agnostic Web Components built with Lit.

## Components

- `<dui-input>`: plain text input.
- `<dui-button>`: native-like button with submit/reset behavior.
- `<dui-button-group>`: merges multiple dui-button elements into one segmented control.
- `<dui-mask-input>`: Inputmask-powered masked input + presets/templates.
- `<dui-number-input>`: numeric input (decimal defaults).
- `<dui-currency-input>`: currency-focused number input.
- `<dui-date-input>`: date-focused masked input (`YYYY-MM-DD` defaults).
- `<dui-dropdown>`: hybrid dropdown/select/combobox with searchable + multi-select modes.

## Build

```bash
npm install
npm --workspace packages/ui run build
```

## Manifest Build

```bash
npm --workspace packages/ui run build:manifest
```

`build` always generates `dist/manifest.json` and validates it with zod.

## Unit Tests

```bash
npm --workspace packages/ui run test
```

## Usage (Vanilla)

```html
<script type="module">
  import '@grayscale-dev/dragon';
</script>

<dui-input label="Name"></dui-input>
<dui-button type="button" size="md" severity="plain" variant="standard" label="Save" badge="3"></dui-button>
<dui-mask-input template-name="phone-us"></dui-mask-input>
<dui-number-input min="0" step="0.5"></dui-number-input>
<dui-currency-input currency="USD" locale="en-US"></dui-currency-input>
<dui-date-input></dui-date-input>
<dui-dropdown label="Status" label-position="floating" searchable max-items-shown="6"></dui-dropdown>
```

## Usage (React)

```tsx
import '@grayscale-dev/dragon';

export function Demo() {
  return (
    <>
      <dui-button type="submit" size="lg" severity="success" variant="outline" label="Save" badge="2" badge-severity="danger"></dui-button>
      <dui-mask-input
        template-name="phone-us"
        onInput={(e) => {
          const el = e.currentTarget as HTMLInputElement & { value: string };
          console.log(el.value);
        }}
      />
      <dui-dropdown
        searchable
        onInput={(e) => {
          const el = e.currentTarget as HTMLElement & { value: string };
          console.log(el.value);
        }}
      />
    </>
  );
}
```

## Manifest Consumption

Machine-readable docs/theme-builder metadata is exported at `@grayscale-dev/dragon/manifest`.

```ts
import manifest from '@grayscale-dev/dragon/manifest';

for (const component of manifest.components) {
  console.log(component.tag, component.cssTokens.length);
}
```

Generate docs/theme controls from this manifest only.

## Manifest Examples Metadata

Each component can include `examples` so docs/playgrounds render usage samples without hardcoded data.

```json
{
  "tag": "dui-input",
  "examples": {
    "groups": [
      { "id": "basic", "label": "Basic", "order": 1 }
    ],
    "items": [
      {
        "id": "basic-plain",
        "group": "basic",
        "title": "Plain Input",
        "order": 1,
        "preview": {
          "attributes": { "placeholder": "Select status", "searchable": true },
          "options": [
            { "value": "new", "label": "New" },
            { "value": "done", "label": "Done" }
          ],
          "value": "new",
          "tokens": { "--ui-input-border": "1px solid #94a3b8" }
        },
        "snippets": [
          { "framework": "vanilla", "lang": "html", "code": "<dui-input></dui-input>" }
        ]
      }
    ]
  }
}
```

Consumer behavior:

- Sort `examples.groups` by `order`.
- For each group, show `examples.items` where `item.group` matches, sorted by `order`.
- Render snippet framework tabs/selectors from `item.snippets[].framework`.
- Use `item.preview` (`attributes`, `tokens`, `options`, `value`, `values`, `notes`) as live preview defaults.

## Presets

`<dui-mask-input template-name="...">` supports:

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

You can also import presets:

```ts
import { DUI_INPUT_MASK_PRESETS } from '@grayscale-dev/dragon';
```

## Inputmask Config Example

```html
<dui-mask-input
  input-mask="decimal"
  input-mask-config='{"alias":"numeric","groupSeparator":",","autoGroup":true,"digits":2,"radixPoint":".","prefix":"$ ","removeMaskOnSubmit":true}'
></dui-mask-input>
```

## Styling

Button sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.
Button severities: `plain` (default), `primary`, `secondary`, `success`, `info`, `warning`, `help`, `danger`.
Button variants: `standard` (default), `ghost`, `outline`, `round`.
Button badges: set `badge` and optional `badge-severity` (`plain` default).

Shared CSS custom properties:

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
- `--ui-button-padding`
- `--ui-button-font-size`
- `--ui-button-font-weight`
- `--ui-button-border`
- `--ui-button-radius`
- `--ui-button-min-width`
- `--ui-button-bg`
- `--ui-button-hover-bg`
- `--ui-button-active-bg`
- `--ui-button-color`
- `--ui-button-focus-ring`
- `--ui-button-disabled-opacity`
- `--ui-button-<severity>-bg`
- `--ui-button-<severity>-hover-bg`
- `--ui-button-<severity>-active-bg`
- `--ui-button-<severity>-color`
- `--ui-button-<severity>-border`
- `--ui-button-badge-size`
- `--ui-button-badge-padding-inline`
- `--ui-button-badge-font-size`
- `--ui-button-badge-font-weight`
- `--ui-button-badge-bg`
- `--ui-button-badge-color`
- `--ui-button-badge-border`
- `--ui-button-badge-<severity>-bg`
- `--ui-button-badge-<severity>-color`
- `--ui-button-badge-<severity>-border`
- `--ui-button-group-radius`
- `--ui-button-group-border-overlap`
- `--ui-dropdown-chevron-color`
- `--ui-dropdown-panel-border`
- `--ui-dropdown-panel-radius`
- `--ui-dropdown-panel-bg`
- `--ui-dropdown-panel-shadow`
- `--ui-dropdown-option-height`
- `--ui-dropdown-option-padding`
- `--ui-dropdown-option-hover-bg`
- `--ui-dropdown-option-selected-bg`
- `--ui-dropdown-chip-bg`
- `--ui-dropdown-chip-color`
- `--ui-dropdown-chip-radius`

Example:

```css
dui-input,
dui-mask-input,
dui-number-input,
dui-currency-input,
dui-date-input {
  --ui-input-padding: 12px 16px;
  --ui-input-border: 1px solid #94a3b8;
  --ui-input-radius: 10px;
}

/* components expose parts for internal controls */
dui-mask-input::part(input) {
  font-weight: 600;
}

dui-button::part(button) {
  letter-spacing: 0.01em;
}
```
