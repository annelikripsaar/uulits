import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { screenSize } from "../styles/screenSize"

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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  width: 100%;
  padding: 0 16px;
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
    text-align: justify;
  }

  & > p {
    &:first-child::first-letter {
      font-family: "Teko", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 48px;
      line-height: 0;
    }
  }

  blockquote {
    margin: 0;
    margin-top: 40px;
    width: 100%;

    & > p {
      text-align: left !important;
    }

    ${screenSize.sm} {
      margin-top: 24px;
    }
  }

  blockquote p {
    font-family: "Teko", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 56px;
    line-height: 1;
    margin-bottom: 0;

    ${screenSize.sm} {
      font-size: 40px;
    }
  }

  img {
    width: 320px;
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
