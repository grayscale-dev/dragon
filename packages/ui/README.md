# Dragon UI

Framework-agnostic Web Components built with Lit. Currently includes `<dui-input>`.

**Build**

```bash
npm install
npm --workspace packages/ui run build
```

**Unit Tests**

```bash
npm --workspace packages/ui run test
```

Covers value/property sync, native `input`/`change` events, form association, focus forwarding, and styling hooks.

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

**Form Behavior**

`<dui-input>` dispatches native `input` and `change` events (bubbling + composed) and exposes a `value` property on the custom element. It also integrates with forms via the Form-Associated Custom Elements API where supported.
