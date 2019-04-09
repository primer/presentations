const configure = require('@primer/blueprints/lib/config')
const withNextPages = require('@primer/next-pages/plugin')

module.exports = configure(withNextPages())
