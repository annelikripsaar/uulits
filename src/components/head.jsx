import React from "react"
import Helmet from "react-helmet"

export default function Head() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Teko&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  )
}
