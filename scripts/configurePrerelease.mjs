import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
/**
 * A minimal description for a parsed package.json object.
 * @typedef {{
    name: string;
    version: string;
}} PackageJson
 */

function main() {
  // eslint-disable-next-line no-undef
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    throw new Error('Usage: node configurePrerelease.mjs <version>');
  }

  const inputVersion = args[0];
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));

  let version = inputVersion;

  if (inputVersion.includes('nightly')) {
    /** @type {PackageJson} */
    const oldVersion = packageJson.version;
    version = `${oldVersion}-nightly.${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;
  }

  const packageJsonNew = {
    ...packageJson,
    version,
  };

  fs.writeFileSync(path.join(rootDir, 'package.json'), JSON.stringify(packageJsonNew, null, 2), 'utf-8');

  // eslint-disable-next-line no-undef
  console.log(`Created package.nightly.json with version ${version}`);
}

main();
