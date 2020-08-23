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

const Address = styled.span`
  font-weight: 700;
  &::before {
    content: url("icons/map-marker.svg");
    margin-right: 8px;
  }
`

const Map = styled.div`
  width: 260px;
  height: 100px;
  margin-bottom: 24px;
  border: 5px solid #272525;
`

const soo = { lat: 59.444861, lng: 24.742297 }
const kadaka = { lat: 59.41213, lng: 24.668579 }
const balta = { lat: 59.441073, lng: 24.736337 }
const tartu = { lat: 58.380947, lng: 26.722218 }

if (typeof window !== "undefined") {
  window.initMap = function () {
    const sooMap = new window.google.maps.Map(
      document.getElementById("sookontakt"),
      {
        center: soo,
        zoom: 15,
      }
    )
    new window.google.maps.Marker({
      position: soo,
      map: sooMap,
    })
  }
}

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
            <Column>
              <Map id={section.node.frontmatter.slug}></Map>
            </Column>
            <Column>
              <h2>{section.node.frontmatter.title}</h2>
              <p>
                <Address>{section.node.frontmatter.address}</Address>
                <br />
                {section.node.frontmatter.address_extra}
              </p>
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
            slug
          }
        }
      }
    }
  }
`
