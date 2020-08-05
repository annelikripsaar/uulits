import React from "react"
import Header from "./header"
import Footer from "./footer"
import styled from "@emotion/styled"
import Head from "./head"

const Container = styled.div`
  font-size: 100%;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  p {
    font-size: 1.05rem;
    font-weight: 300;
  }
`

const Main = styled.main``

export default function Layout({ children }) {
  return (
    <Container>
      <Head />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
