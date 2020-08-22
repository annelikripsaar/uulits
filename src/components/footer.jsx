import React from "react"
import styled from "@emotion/styled"
import { Logo } from "./Logo"

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #272525;
  padding: 24px 0 48px 0;
`

export default function Footer() {
  return (
    <Container>
      <Logo color="white" />
    </Container>
  )
}
