exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const menuTemplate = require.resolve(`./src/templates/menuTemplate.js`)
  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)
  const contactTemplate = require.resolve(`./src/templates/contactTemplate.jsx`)

  const menuPageResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title] }
        filter: {
          frontmatter: { in_nav: { ne: false } }
          fileAbsolutePath: { regex: "/menyy/" }
        }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (menuPageResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  menuPageResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: menuTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })

  const pageResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        filter: {
          frontmatter: { slug: { ne: "home" } }
          fileAbsolutePath: { regex: "/^((?!menyy).)*$/" }
        }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (pageResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  pageResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })

  const contactResult = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { slug: { eq: "kontakt" } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (contactResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  contactResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: contactTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}
