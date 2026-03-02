import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

const apps = {
  react: {
    port: 5173,
    workspace: 'tests/react',
    spec: 'react.spec.ts'
  },
  vue: {
    port: 5174,
    workspace: 'tests/vue',
    spec: 'vue.spec.ts'
  },
  svelte: {
    port: 5175,
    workspace: 'tests/svelte',
    spec: 'svelte.spec.ts'
  },
  angular: {
    port: 4200,
    workspace: 'tests/angular',
    spec: 'angular.spec.ts'
  },
  ember: {
    port: 4201,
    workspace: 'tests/ember',
    spec: 'ember.spec.ts'
  }
} as const;

type AppName = keyof typeof apps;

const selected = (process.env.PW_APP as AppName | undefined) ?? null;
const appEntries = selected ? [[selected, apps[selected]]] : Object.entries(apps);

const projects = appEntries.map(([name, config]) => ({
  name,
  testMatch: [config.spec],
  use: {
    baseURL: `http://127.0.0.1:${config.port}`
  }
}));

const webServer = selected
  ? [
      {
        command: `npm --prefix packages/ui run build && npm --prefix ${apps[selected].workspace} run dev`,
        url: `http://127.0.0.1:${apps[selected].port}`,
        reuseExistingServer: !process.env.CI,
        cwd: repoRoot
      }
    ]
  : appEntries.map(([_, config]) => ({
      command: `npm --prefix packages/ui run build && npm --prefix ${config.workspace} run dev`,
      url: `http://127.0.0.1:${config.port}`,
      reuseExistingServer: !process.env.CI,
      cwd: repoRoot
    }));

export default defineConfig({
  testDir: path.resolve(__dirname, 'tests'),
  timeout: 60_000,
  expect: { timeout: 5_000 },
  workers: 1,
  webServer,
  projects,
  use: {
    headless: true
  }
});
