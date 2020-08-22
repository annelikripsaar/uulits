import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CrossSeparator from "../components/CrossSeparator"
import ContactForm from "../components/Form/Form"
import styled from "@emotion/styled"

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

const Video = styled.video`
  width: 100vw;
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Columns>
        {frontmatter.featured_image?.length && (
          <img src={frontmatter.featured_image} />
        )}
        <TextContainer
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Columns>
      {frontmatter.video?.length && (
        <>
          <CrossSeparator />
          <Video src={frontmatter.video} controls />
        </>
      )}
      <ContactForm />
    </Layout>
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
        video
      }
    }
  }
`
