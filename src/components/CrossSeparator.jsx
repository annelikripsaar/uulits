import React from "react"
import styled from "@emotion/styled"

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-bottom: 56px;
`

export default function CrossSeparator() {
  return (
    <Container>
      <img src="icons/crossseparator.svg" alt="" />
    </Container>
  )
}
