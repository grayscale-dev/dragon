import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getManifest } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..', '..');
const outputDir = path.resolve(packageRoot, 'dist');
const outputFile = path.resolve(outputDir, 'manifest.json');

async function main(): Promise<void> {
  const manifest = getManifest();
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  // Keep a concise log line for CI visibility.
  console.log(`Wrote manifest: ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
