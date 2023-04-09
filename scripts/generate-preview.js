const { readFile, writeFile } = require('fs/promises')
const { join } = require('path')

const { glob } = require('glob')

const TEMPLATE_DIR = 'templates'

const main = async () => {
  const templates = await glob('*', {
    cwd: TEMPLATE_DIR,
  })
  for (const template of templates) {
    const cwd = `${TEMPLATE_DIR}/${template}`
    const files = await glob('**/*.*', {
      cwd,
      ignore: ['node_modules/**', 'dist/**', 'yarn.lock'],
    })
    const tree = {}
    let tmpTree
    for (const file of files) {
      const paths = file.split('/')
      for (const pathIndex in paths) {
        if (Number(pathIndex) === 0) {
          tmpTree = tree
        }
        if (paths.length === Number(pathIndex) + 1) {
          const contents = await readFile(join(cwd, file), {
            encoding: 'utf8',
          })
          Object.assign(tmpTree, {
            ...tmpTree,
            [paths[pathIndex]]: {
              file: {
                contents,
              },
            },
          })
        } else {
          Object.assign(tmpTree, {
            ...tmpTree,
            [paths[pathIndex]]: {
              directory: {
                ...tmpTree?.[paths?.[pathIndex]]?.directory,
              },
            },
          })
          tmpTree = tmpTree[paths[pathIndex]].directory
        }
      }
    }
    const sharedFiles = await glob('shared/*.*')
    for (const sharedFile of sharedFiles) {
      const contents = await readFile(sharedFile, 'utf8')
      const file = sharedFile.split('/')[1]
      Object.assign(tree, {
        ...tree,
        src: {
          directory: {
            ...tree?.src?.directory,
            shared: {
              directory: {
                ...tree?.src?.directory?.shared?.directory,
                [file]: {
                  file: {
                    contents,
                  },
                },
              },
            },
          },
        },
      })
    }
    await writeFile(
      `src/templates/${template.split('-')[0]}.ts`,
      `import { FileSystemTree } from '@webcontainer/api'

export const files: FileSystemTree = ${JSON.stringify(tree)}`,
      {
        encoding: 'utf8',
      }
    )
  }
}

main()
