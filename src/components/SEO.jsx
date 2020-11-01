import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export const SEO = ({ description, meta, title }) => {
	const { site } = useStaticQuery(
		graphql`
			query AllPageMeta {
				site {
					siteMetadata {
						siteUrl
						title
						description
						image
					}
				}
			}
		`
	);

	const metaTitle = title ? `${title} | Uulits Tänavagurmee` : 'Uulits Tänavagurmee';
	const metaDescription = description || site.siteMetadata.description;
	const metaImage = `${site.siteMetadata.image}`;

    const metaData = [
		{
			name: `description`,
			content: metaDescription,
		},
		{
			property: `og:title`,
			content: metaTitle,
		},
		{
			property: `og:description`,
			content: metaDescription,
		},
		{
			property: `og:type`,
			content: `website`,
		},
		{
			property: `og:image`,
			content: metaImage,
		},
		{
			name: `twitter:card`,
			content: `summary`,
		},
		{
			name: `twitter:title`,
			content: metaTitle,
		},
		{
			name: `twitter:description`,
			content: metaDescription,
		},
		{
			name: `twitter:image`,
			content: metaImage,
		},
		...(meta || []),
	];

	return (
		<Helmet
			title={metaTitle}
			meta={metaData}
		/>
	);
};

export default SEO;
