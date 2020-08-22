import React from "react"
import styled from "@emotion/styled"
import { Logo } from "./Logo"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4vw 4vw 0 4vw;
`

const LeftLines = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`

const RightLines = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const ThinLine = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 4px;
`

const ThickLine = styled.div`
  width: 95%;
  border-bottom: 5px solid black;
`

export default function TopBar() {
  return (
    <Container>
      <LeftLines>
        <ThinLine />
        <ThickLine />
      </LeftLines>
      <Logo color="black" />
      <RightLines>
        <ThinLine />
        <ThickLine />
      </RightLines>
    </Container>
  )
}
