const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Primer Presentations',
    shortName: 'Presentations',
    description: 'Presentation system for Primer'
  },
  pathPrefix: '/presentations',
  plugins: [
    '@primer/gatsby-theme-doctocat',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          react: path.resolve(__dirname, 'node_modules', 'react')
        }
      }
    }
  ]
}
