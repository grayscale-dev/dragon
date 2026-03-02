import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium', headless: true })
  ],
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2020',
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    })
  ],
  testFramework: {
    config: {
      timeout: 4000
    }
  }
};
