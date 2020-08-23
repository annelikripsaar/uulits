import React from "react"
import Helmet from "react-helmet"

export default function Head() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Uulits Tänavagurmee</title>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWB7j__MMHAziu_ZH9X-mzxOlsLXIynjA&callback=initMap"
        async
        defer
      />
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
