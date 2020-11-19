import React from "react"
import styled from "@emotion/styled"

import Facebook from "../assets/facebook.svg"
import Instagram from "../assets/instagram.svg"
import Youtube from "../assets/youtube.svg"
import TripAdvisor from "../assets/tripadvisor.svg"

const Container = styled.div`
  display: inline-flex;
  align-items: flex-end;

  a:not(:last-of-type) {
    margin-right: 24px;
  }

  svg path {
    fill: ${p => (p.color ? p.color : "black")};
  }
`

export const Social = ({ color, className }) => {
  return (
    <Container className={className} color={color}>
      <a href="https://www.facebook.com/uulitsrestoran" target="_blank" rel="noreferrer">
        <Facebook />
      </a>
      <a href="https://www.instagram.com/uulits/" target="_blank" rel="noreferrer">
        <Instagram />
      </a>
      <a href="https://www.youtube.com/watch?v=pnYz9loxFw0" target="_blank" rel="noreferrer">
        <Youtube />
      </a>
      <a
        href="https://www.tripadvisor.com/Restaurant_Review-g274958-d11734273-Reviews-Soo_Uulits-Tallinn_Harju_County.html?m=19905"
        target="_blank" rel="noreferrer"
      >
        <TripAdvisor />
      </a>
    </Container>
  )
}
