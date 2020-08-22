import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ContactForm from "../components/Form/Form"
import styled from "@emotion/styled"

const ContactRow = styled.div`
  display: flex;
  align-items: flex-end;
`

const TextContainer = styled.div`
  h1 {
    display: inline-block;
    margin-top: 0;

    &::after {
      content: "";
      position: absolute;
      top: 90%;
      left: 0%;
      border-bottom: 5px solid #272525;
      width: 300px;
      transform: rotate(-6.9deg);
    }
  }

  width: 70%;
  margin-left: 56px;
  line-height: 1.5;
`

const Column = styled.div`
  margin-left: 56px;
  line-height: 1.5;

  p:first-of-type {
    margin-top: 0;
  }

  h2 {
    font-size: 32px;
    text-transform: uppercase;
    margin-bottom: 16px;
    margin-top: 0;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { page, sections } = data
  return (
    <Layout>
      <TextContainer
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
      {sections.edges.map(section => {
        return (
          <ContactRow>
            <Column>kaart</Column>
            <Column>
              <h2>{section.node.frontmatter.title}</h2>
              <p>{section.node.frontmatter.address}</p>
              <p>{section.node.frontmatter.address_extra}</p>
            </Column>
            <Column
              key={section.node.id}
              dangerouslySetInnerHTML={{ __html: section.node.html }}
            />
          </ContactRow>
        )
      })}
      <ContactForm />
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
        fileAbsolutePath: { regex: "/kontakt/" }
        frontmatter: { in_nav: { eq: false } }
      }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            address
            address_extra
          }
        }
      }
    }
  }
`
