import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ContactForm from "../components/Form/Form"
import styled from "@emotion/styled"
import { useEffect } from "react"
import { screenSize } from "../styles/screenSize"
import { Helmet } from "react-helmet"
import SEO from "../components/SEO"

const Container = styled.div`
  max-width: 1000px;
  margin: 64px auto;
`

const ContactRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 64px;
  flex-wrap: wrap;

  div:nth-child(2) {
    width: 30%;
  }

  ${screenSize.sm} {
    flex-direction: column;
    align-items: center;

    & > div,
    & > div:nth-child(2) {
      width: 90%;
    }
  }
`

const Column = styled.div`
  margin-left: 40px;
  line-height: 1.5;

  p:first-of-type {
    margin-top: 0;
  }

  h2 {
    font-size: 32px;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 16px;
    margin-top: 0;
  }

  ${screenSize.sm} {
    margin-left: 0;
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

  ${screenSize.sm} {
    margin-left: 0;
    width: 100%;
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
const tartu = { lat: 58.380947, lng: 26.722218 }

let resolveGoogleMapsSdkPromise
const googleMapsSdkPromise = new Promise(resolve => {
  resolveGoogleMapsSdkPromise = resolve
})

if (typeof window !== "undefined") {
  window.initMap = resolveGoogleMapsSdkPromise
}

function initializeMaps() {
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

  const kadakaMap = new window.google.maps.Map(
    document.getElementById("kadakakontakt"),
    {
      center: kadaka,
      zoom: 15,
    }
  )
  new window.google.maps.Marker({
    position: kadaka,
    map: kadakaMap,
  })

  const tartuMap = new window.google.maps.Map(
    document.getElementById("tartukontakt"),
    {
      center: tartu,
      zoom: 15,
    }
  )
  new window.google.maps.Marker({
    position: tartu,
    map: tartuMap,
  })

}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { page, sections } = data
  useEffect(() => {
    let aborted = false

    googleMapsSdkPromise.then(() => {
      if (!aborted) {
        initializeMaps()
      }
    })
    return () => {
      aborted = true
    }
  }, [])
  return (
    <>
      <SEO title={page.frontmatter.title}/>
    <Layout>
      <Helmet>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWB7j__MMHAziu_ZH9X-mzxOlsLXIynjA&callback=initMap"
          async
          defer
        />
      </Helmet>
      <Container>
        <TextContainer
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        {sections.edges.map(section => {
          return (
            <ContactRow key={section.node.id}>
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
      </Container>
      <ContactForm />
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
