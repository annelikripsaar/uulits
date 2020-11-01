import React from "react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/SEO"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0 56px 0;
`

export default function PageNotFound() {
  return (
    <>
      <SEO />
      <Layout>
        <Container>
          <h1>Lehte ei leitud</h1>
          <p>
            Otsitavat lehte ei ole olemas, palun navigeerige menüü kaudu mujale.
          </p>
        </Container>
      </Layout>
    </>
  )
}
