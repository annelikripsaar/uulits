import React from "react"
import Header from "./header"
import Footer from "./footer"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import Head from "./head"

const Container = styled.div`
  font-size: 100%;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.05rem;
  font-weight: 300;

  p {
    font-size: 1.05rem;
    font-weight: 300;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: "Teko", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 56px;
  }

  h1 {
    position: relative;
  }

  h1::after {
    content: "";
    position: absolute;
    top: 75%;
    left: 50%;
    border-bottom: 5px solid #272525;
    width: 300px;
    transform: rotate(-6.9deg) translateX(-50%);
  }

  strong {
    font-weight: 700;
  }
`

const Main = styled.main``

export default function Layout({ children }) {
  return (
    <Container>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Head />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
