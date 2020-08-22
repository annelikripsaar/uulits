import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import CrossSeparator from "../components/CrossSeparator"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0 56px 0;
`

const Banner = styled.img`
  width: 100vw;
  margin-bottom: 56px;
  border-top: 5px solid black;
`

const TextContainer = styled.div`
  max-width: 750px;
  margin-left: 56px;
  line-height: 1.5;

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

  p:first-of-type {
    margin-top: 0;
  }

  & > p {
    &::first-letter {
      font-family: "Teko", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 48px;
      line-height: 0;
    }

    &:last-of-type {
      margin-bottom: 56px;
    }
  }

  blockquote {
    margin: 0;
  }

  blockquote p {
    font-family: "Teko", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 56px;
    line-height: 1;
  }
`

export default function Home({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <Container>
        <Banner src="uploads/front-banner.png" />
        <CrossSeparator />
        <TextContainer dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
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
