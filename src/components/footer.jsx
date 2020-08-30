import React from "react"
import styled from "@emotion/styled"
import { Logo } from "./Logo"
import { Social } from "./Social"
import { screenSize } from "../styles/screenSize"

const FooterSocial = styled(Social)`
  position: absolute;
  top: 4vw;
  right: 4vw;

  ${screenSize.sm} {
    position: static;
    margin-top: 32px;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #272525;
  padding: 24px 0 48px 0;
  position: relative;

  ${screenSize.sm} {
    flex-direction: column;
    align-items: center;
  }
`

export default function Footer() {
  return (
    <Container>
      <Logo color="white" />
      <FooterSocial color="white" />
    </Container>
  )
}
