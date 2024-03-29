import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CrossSeparator from "../components/CrossSeparator"
import ContactForm from "../components/Form/Form"
import styled from "@emotion/styled"
import { screenSize } from "../styles/screenSize"
import SEO from "../components/SEO"

const Columns = styled.div`
  display: flex;
  max-width: 850px;
  margin: 64px auto;
  align-items: flex-start;

  img {
    width: 30%;
    border: 5px solid black;
    border-radius: 1000px;
  }

  ${screenSize.sm} {
    flex-direction: column;
    width: 100vw;
    margin: 40px auto;

    img {
      box-sizing: border-box;
      width: 288px;
      margin-left: 16px;
    }
  }
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
  text-align: justify;

  .separator::before {
    content: url("/icons/crossseparator.svg");
    display: flex;
    justify-content: center;
    padding: 56px 0;
  }

  ${screenSize.sm} {
    box-sizing: border-box;
    margin: 24px 0;
    width: 100%;
    padding: 0 16px;
  }
`

const Video = styled.video`
  width: 100vw;
`

const Image = styled.img`
  width: 100vw;
`

const Extra = styled.div`
  margin-bottom: 56px;
  padding: 0 56px;
  text-align: center;
  font-family: "Teko", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 56px;
  line-height: 1;

  ${screenSize.sm} {
    font-size: 40px;
    padding: 0 16px;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <>
      <SEO title={frontmatter.title} />
      <Layout>
        <Columns>
          {frontmatter.featured_image?.length && (
            <img src={`/${frontmatter.featured_image}`} alt="" />
          )}
          <TextContainer
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Columns>
        {frontmatter.extra && (
          <>
            <CrossSeparator />
            <Extra
              dangerouslySetInnerHTML={{ __html: frontmatter.extra }}
            ></Extra>
          </>
        )}
        {frontmatter.video?.includes("mp4") ? (
          <>
            <CrossSeparator />
            <Video src={frontmatter.video} controls />
          </>
        ) : frontmatter.video?.length ? (
          <>
            <CrossSeparator />
            <Image src={frontmatter.video} alt="" />
          </>
        ) : (
          ""
        )}
        <ContactForm />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        featured_image
        extra
        video
      }
    }
  }
`
