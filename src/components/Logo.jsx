import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const LogoLink = styled(Link)`
  margin: 0 24px;
`

const LogoImg = styled.img`
  width: 150px;
`

export function Logo({ color }) {
  return (
    <LogoLink to="/">
      {color === "black" ? (
        <LogoImg src="/uploads/logo.png" alt="Uulits Tänavagurmee" />
      ) : (
        <LogoImg src="/uploads/logo-white.png" alt="Uulits Tänavagurmee" />
      )}
    </LogoLink>
  )
}
