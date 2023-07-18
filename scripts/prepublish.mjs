#!/usr/bin/env zx
import 'zx/globals';
import { readFile, writeFile } from 'fs/promises';

async function release() {
  const packageFile = './package.json';
  let packageData = await readFile(packageFile);
  let { version } = JSON.parse(packageData);

  // Increment the version number
  const versionParts = version.split('.');
  versionParts[2] = String(Number(versionParts[2]) + 1);
  version = versionParts.join('.');

  // Update the package.json file with the new version
  const updatedPackageData = JSON.stringify({ ...JSON.parse(packageData), version }, null, 2);
  await writeFile(packageFile, updatedPackageData);

  await $`pnpm install && pnpm build`;

  await $`git add -A .`;

  try {
    await $`git commit -m 'chore: release ${version}' --allow-empty`;
    await $`git tag -m "v${version}" v${version}`;
    await $`git push --follow-tags`;
  } catch (e) {
    if (!e.stdout.includes('nothing to commit')) {
      throw e;
    }
  }
}

await release();
