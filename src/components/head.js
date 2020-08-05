import React from "react"
import Helmet from "react-helmet"

export default function Head() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Uulits Tänavagurmee</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  )
}
