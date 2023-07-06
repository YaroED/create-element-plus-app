#!/usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'
import renderTemplate from './utils/renderTemplate'
import generateReadme from './utils/generateReadme'
import { stdoutBanner } from './utils/banners'
import { isValidPackageName, toValidPackageName, canSkipEmptying } from './utils/validate'
import minimist from 'minimist'
import prompts from 'prompts'
import { red, green, bold } from 'kolorist'

async function init() {
  stdoutBanner()

  const cwd = process.cwd()
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'with-tests': ['tests'],
      router: ['vue-router']
    },
    string: ['_'],
    // all arguments are treated as booleans
    boolean: true
  })
  let targetDir = argv._[0] || ''
  const defaultProjectName = !targetDir ? 'hlp-vue-project' : targetDir
  const forceOverwrite = argv.force
  let result: {
    projectName?: string
    packageName?: string
  } = {}

  try {
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Project language: JavaScript / TypeScript
    // - Add JSX Support?
    // - Install Vue Router for SPA development?
    // - Install Pinia for state management?
    // - Add Cypress for testing?
    // - Add Playwright for end-to-end testing?
    // - Add ESLint for code quality?
    // - Add Prettier for code formatting?
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: state => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSkipEmptying(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`

            return `${dirForPrompt} is not empty. Remove existing files and continue?`
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: dir => isValidPackageName(dir) || 'Invalid package.json name'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  const root = path.join(cwd, targetDir)
  const templateRoot = path.resolve(__dirname, 'template')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    renderTemplate(templateDir, root)
  }

  render('base')
  render('lint-staged')

  // README generation
  fs.writeFileSync(
    path.resolve(root, 'README.md'),
    generateReadme({
      projectName: result.projectName ?? result.packageName ?? defaultProjectName
    })
  )

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    const cdProjectName = path.relative(cwd, root)
    console.log(
      `  ${bold(
        green(`cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)
      )}\n`
    )
    console.log(`  ${bold(green(`pnpm install`))}\n`)
    console.log(`  ${bold(green(`pnpm dev`))}\n`)
  }
}

init().catch(e => {
  console.error(e)
})
