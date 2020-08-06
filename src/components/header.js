import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Header() {
  const data = useStaticQuery(graphql`
    query NavQuery {
      allMarkdownRemark(filter: { frontmatter: { slug: { ne: "home" } } }) {
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
    <>
      <Link to="/">
        <h3>Uulits</h3>
      </Link>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }, index) => {
          return (
            <ListLink to={"/" + node.frontmatter.slug}>
              {node.frontmatter.title}
            </ListLink>
          )
        })}
      </ul>
    </>
  )
}
