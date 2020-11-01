/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteUrl: "https://www.uulits.ee",
    title: `Uulits Tänavagurmee`,
    description: `Uulits on tänavagurmee teerajaja Eestis, viie aastaga oleme avanud neli Uulitsat ning meist on saanud Eesti suurim kodumaine burgerikett.`,
    image: `/uulits_social.png`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
  ],
}
