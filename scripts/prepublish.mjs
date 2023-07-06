#!/usr/bin/env zx
import 'zx/globals'

let { version } = JSON.parse(await fs.readFile('./package.json'))

await $`pnpm install`
await $`pnpm build`

await $`git add -A .`
try {
  await $`git commit -m 'chore: release ${version}' --allow-empty`
  await $`git tag -m "v${version}" v${version}`
  await $`git push --follow-tags`
} catch (e) {
  if (!e.stdout.includes('nothing to commit')) {
    throw e
  }
}
