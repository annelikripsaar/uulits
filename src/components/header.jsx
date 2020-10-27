import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import TopBar from "./TopBar"
import { Social } from "./Social"
import styled from "@emotion/styled"
import { screenSize } from "../styles/screenSize"

const Container = styled.div``

const HeaderSocial = styled(Social)`
  position: absolute;
  top: 4vw;
  right: 4vw;

  ${screenSize.sm} {
    display: none;
  }
`

const Nav = styled.ul`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  padding: 0;
  flex-wrap: wrap;

  li {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    border-radius: 100%;
    border: 1.5px solid #272525;
    margin: 0 2px;

    a {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 0.875rem;
      text-align: center;
      color: inherit;
      width: 80px;
      height: 80px;
      padding: 2px;
    }

    &:hover {
      background-color: #272525;

      a {
        color: white;
      }
    }
  }

  ${screenSize.sm} {
    li {
      margin-bottom: 24px;
    }
  }
`

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const TruckIcon = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  height: 80px;
  background-image: url("/icons/truck.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: center;
  padding: 0 20px 0 40px;
  margin: 0 0px 0 -20px;

  a {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.875rem;
    text-align: center;
    color: inherit;
    width: 80px;
    height: 80px;
    padding: 2px;
  }

  &:hover {
    background-image: url("/icons/truck-black.svg");

    a {
      color: white;
    }
  }
`

const TruckLink = props => (
  <TruckIcon>
    <Link to={props.to}>{props.children}</Link>
  </TruckIcon>
)

export default function Header() {
  const data = useStaticQuery(graphql`
    query NavQuery {
      allMarkdownRemark(
        filter: { frontmatter: { slug: { ne: "home" }, in_nav: { ne: false } } }
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Container>
      <HeaderSocial color="#272525" />
      <TopBar />
      <Nav>
        {data.allMarkdownRemark.edges.map(({ node }, index) => {
          if (node.frontmatter.slug === "foodtruck") {
            return (
              <TruckLink to={"/" + node.frontmatter.slug} key={index}>
                {node.frontmatter.title}
              </TruckLink>
            )
          } else {
            return (
              <ListLink to={"/" + node.frontmatter.slug} key={index}>
                {node.frontmatter.title}
              </ListLink>
            )
          }
        })}
      </Nav>
    </Container>
  )
}
