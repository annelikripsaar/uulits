import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function Home({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </Layout>
  )
}

export const HomepageQuery = graphql`
  query HompageQuery {
    markdownRemark(frontmatter: { slug: { eq: "home" } }) {
      frontmatter {
        title
        slug
      }
      html
    }
  }
`
