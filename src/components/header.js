import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import TopBar from "./TopBar"
import styled from "@emotion/styled"

const Container = styled.div``

const Nav = styled.ul`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  padding: 0;

  li {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    border-radius: 100%;
    border: 1px solid #272525;

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
`

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Header() {
  const data = useStaticQuery(graphql`
    query NavQuery {
      allMarkdownRemark(
        filter: { frontmatter: { slug: { ne: "home" } } }
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
      <TopBar />
      <Nav>
        {data.allMarkdownRemark.edges.map(({ node }, index) => {
          return (
            <ListLink to={"/" + node.frontmatter.slug}>
              {node.frontmatter.title}
            </ListLink>
          )
        })}
      </Nav>
    </Container>
  )
}
