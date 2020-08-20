import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "@emotion/styled"

const MenuContainer = styled.div`
  width: 850px;
  margin: 64px auto;
  text-align: center;

  h1 {
    margin-bottom: 32px;
  }

  h2 {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.44rem;
  }

  p {
    margin: 40px 0;
  }

  .separator {
    width: 100%;
    border-bottom: 1px solid black;
    height: 56px;
    margin-bottom: 40px;
  }

  .warning {
    font-size: 0.81rem;
  }

  .spicy::before {
    content: url("icons/spicy.svg");
  }

  .special {
    margin-bottom: -32px;
  }

  .special::before {
    content: url("icons/special.svg");
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { page, sections } = data
  return (
    <Layout>
      <MenuContainer>
        <h1>{page.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        {sections.edges.map(section => {
          return (
            <div
              key={section.node.id}
              dangerouslySetInnerHTML={{ __html: section.node.html }}
            />
          )
        })}
      </MenuContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
    sections: allMarkdownRemark(
      filter: {
        frontmatter: { in_nav: { eq: false }, parent_slug: { eq: $slug } }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
