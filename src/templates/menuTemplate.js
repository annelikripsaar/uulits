import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import { screenSize } from "../styles/screenSize"
import SEO from "../components/SEO"

const MenuContainer = styled.div`
  max-width: 850px;
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
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;

    ${screenSize.sm} {
      max-width: 100%;
    }
  }

  .blog-post-content {
    margin-bottom: 32px;
  }

  p {
    margin: 40px 0;
    font-size: 1.25rem;
  }

  blockquote {
    font-style: italic;
    margin: 16px 0 40px 0;

    p {
      font-weight: 400;
      margin: 0;
    }
  }

  .ellipsis::before {
    content: url("icons/ellipsis.svg");
  }

  .separator {
    width: 100%;
    border-bottom: 1px solid black;
    height: 24px;
    margin-bottom: 24px;
  }

  .koostis {
    display: block;
    font-size: 16px;
    line-height: 1.25;
    margin-top: 8px;
  }

  .warning {
    font-size: 0.81rem;
    margin-bottom: 16px;
  }

  .spicy::before {
    content: url("icons/spicy.svg");
  }

  .vege,
  .vegan {
    display: inline-block;
    margin-top: 16px;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  .vege::before {
    content: url("icons/vege.svg");
  }

  .vegan::before {
    content: url("icons/vegan.svg");
  }

  .special {
    display: block;
  }

  .special::before {
    content: url("icons/special.svg");
  }

  .new {
    margin-top: 16px;

    ::before {
      content: url("icons/new.svg");
    }
  }

  ${screenSize.sm} {
    padding: 0 8px;
  }
`

const SectionButton = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  cursor: pointer;
`

const SectionContent = styled.div`
  ${p => (p.open ? "display: block;" : "display: none;")}
`

const Section = ({ section }) => {
  const [isOpen, setOpen] = useState(false)

  function toggleSection() {
    setOpen(prev => !prev)
  }

  return (
    <div key={section.id}>
      <div className="separator"></div>
      <SectionButton onClick={toggleSection}>
        {section.frontmatter.new && <div class="new"></div>}
        <h2>{section.frontmatter.title}</h2>
      </SectionButton>
      <SectionContent
        open={isOpen}
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    </div>
  )
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { page, sections } = data

  return (
    <>
      <SEO title={page.frontmatter.title} />
      <Layout>
        <MenuContainer>
          <h1>{page.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
          {sections.edges.map(section => {
            return <Section key={section.node.id} section={section.node} />
          })}
        </MenuContainer>
      </Layout>
    </>
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
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            new
          }
        }
      }
    }
  }
`
