# Dragon UI Monorepo

This repo contains the `@grayscale-dev/dragon` Web Components library and contract test apps for React, Vue, Angular, Svelte, and Ember.

**Setup**

```bash
npm install
```

**Build**

```bash
npm run build
```

**Tests**

```bash
npm run test:ui
npm run test:react
npm run test:vue
npm run test:angular
npm run test:svelte
npm run test:ember
npm test
```

**Structure**

- `packages/ui` Lit-based component library
- `tests/react` minimal React app for Playwright contract tests
- `tests/vue` minimal Vue app for Playwright contract tests
- `tests/angular` minimal Angular app for Playwright contract tests
- `tests/svelte` minimal Svelte app for Playwright contract tests
- `tests/ember` minimal Ember app for Playwright contract tests
- `tests/playwright` Playwright config + tests
