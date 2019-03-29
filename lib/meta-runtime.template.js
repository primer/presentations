/**
 * XXX This file is a *template* for generating the runtime
 * "@primer/blueprints/meta" endpoint.
 */

// eslint-disable-next-line no-unused-vars
const pageTree = PAGE_TREE_JSON

const pageList = []
const pageMap = new Map()

walkPages(page => {
  pageList.push(page)
  pageMap.set(page.path, page)
})

export {pageList, pageMap, pageTree, walkPages, getFirstPage}

function walkPages(visitor) {
  return visit(pageTree, visitor)
}

function visit(page, visitor, ...rest) {
  let value = visitor(page, ...rest)
  if (value !== false) {
    for (const child of page.children) {
      value = visit(child, visitor, page, ...rest)
      if (value === false) break
    }
  }
  return value
}

function getFirstPage(test) {
  let first
  walkPages((page, ...rest) => {
    if (test(page, ...rest)) {
      first = page
      return false
    }
  })
  return first
}
