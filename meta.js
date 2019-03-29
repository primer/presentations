/**
 * XXX this file is intended to be processed with val-loader!
 *
 * It exports an object with a "code" string that's bundled as-is,
 * and should not be used directly in other environments.
 */
const globby = require('globby')
const matter = require('gray-matter')
const {join, parse: parsePath} = require('path')
const {readFileSync} = require('fs')

const RUNTIME_TEMPLATE_PATH = require.resolve('./lib/meta-runtime.template')

module.exports = () => {
  // FIXME: get this from the config?
  const pageExtensions = ['md', 'mdx']

  // FIXME: get this from... next?
  const pagesDir = join(process.cwd(), 'pages')
  // console.warn(`loading pages from: ${pagesDir}`)

  const globs = ['!node_modules', ...pageExtensions.map(ext => `**/*.${ext}`)]
  // console.warn(`page globs: ${globs.join(', ')}`)

  return globby(globs, {cwd: pagesDir}).then(pagePaths => {
    const pages = pagePaths.map(path => {
      const file = join(pagesDir, path)
      const page = loadPage(file)
      return Object.assign(page, {
        path: getURLPathForFile(path),
        requirePath: `./${path}`,
        file
      })
    })

    return {
      cacheable: true,
      dependencies: [RUNTIME_TEMPLATE_PATH, ...pages.map(page => page.file)],
      code: getCodeForPages(pages)
    }
  })
}

function loadPage(path) {
  const buffer = readFileSync(path)
  const {data, excerpt} = matter(buffer, {excerpt: true})
  return {path, meta: data, excerpt}
}

function getPathMap(pages) {
  const map = {}
  for (const page of pages) {
    const {path} = page
    if (map[path]) {
      throw new Error(`Duplicate path for page: ${page.file} (existing: ${map[path].file})`)
    }
    const parts = removePrefix(path, '/').split('/')
    parts.pop()
    page.parent = `/${parts.join('/')}`
    page.children = []

    map[path] = page
  }
  return map
}

function getPageTree(map) {
  const pages = Object.values(map)
  let root = map['/']
  if (root) {
    delete root.parent
  } else {
    pages.sort((a, b) => a.path.localeCompare(b.path))
    root = pages[0]
  }

  // remove root from the list of nodes
  const nodes = pages.slice()
  nodes.splice(nodes.indexOf(root), 1)

  const orphans = []
  for (const node of nodes) {
    const parent = map[node.parent]
    if (parent) {
      parent.children.push(node)
    } else {
      orphans.push(node)
    }
  }

  if (orphans.length) {
    // eslint-disable-next-line no-console
    console.warn(`unable to nest ${orphans.length} pages: ${orphans.map(node => node.file).join(', ')}`)
    root.orphans = orphans
  }

  return root
}

function getCodeForPages(pages) {
  const pageMap = getPathMap(pages)
  const pageTree = getPageTree(pageMap)
  const template = readFileSync(RUNTIME_TEMPLATE_PATH, 'utf8')
  const code = template.replace(/PAGE_TREE_JSON/g, JSON.stringify(pageTree))
  return code // + `\nconsole.log('page map:', ${JSON.stringify(pageMap)})`
}

function removePrefix(str, prefix) {
  if (str.indexOf(prefix) === 0) {
    return str.substr(prefix.length)
  } else {
    return str
  }
}

function getURLPathForFile(path) {
  const {dir, name} = parsePath(path)
  return name === 'index' ? join('/', dir) : join('/', dir, name)
}
