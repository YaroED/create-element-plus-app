import getCommand from './getCommand'

export default function generateReadme({ projectName, packageManager = 'pnpm' }) {
  const commandFor = (scriptName: string, args?: string) =>
    getCommand(packageManager, scriptName, args)

  let readme = `# ${projectName}

## Develop Environment
environment  | version
------------- | -------------
node  | v16.13.2
pnpm  | v7.1.9

## Project Setup

`

  let npmScriptsDescriptions = `\`\`\`sh
${commandFor('install')}
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
${commandFor('dev')}
\`\`\`

### Compile and Minify for QA

\`\`\`sh
${commandFor('build:beta')}
\`\`\`

### Compile and Minify for Production

\`\`\`sh
${commandFor('build:production')}
\`\`\`
`

  readme += npmScriptsDescriptions

  return readme
}
