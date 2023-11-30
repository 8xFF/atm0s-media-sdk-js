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
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
  const version = packageJson.version;
  const nightlyVersion = `${version}-nightly.${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

  const packageJsonNightly = {
    ...packageJson,
    version: nightlyVersion,
  };

  fs.writeFileSync(path.join(rootDir, 'package.json'), JSON.stringify(packageJsonNightly, null, 2), 'utf-8');

  // eslint-disable-next-line no-undef
  console.log(`Created package.nightly.json with version ${nightlyVersion}`);
}

main();
