exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`);
	const contactTemplate = require.resolve(`./src/templates/contactTemplate.jsx`);

	const menuPageResult = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___title] }
				filter: { frontmatter: { in_nav: { ne: false } }, fileAbsolutePath: { regex: "/menyy/" } }
			) {
				edges {
					node {
						frontmatter {
							slug
						}
					}
				}
			}
		}
	`);

	// Handle errors
	if (menuPageResult.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	const pageResult = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: ASC, fields: [frontmatter___title] }
				filter: { frontmatter: { slug: { ne: "home" } }, fileAbsolutePath: { regex: "/^((?!menyy).)*$/" } }
			) {
				edges {
					node {
						frontmatter {
							slug
						}
					}
				}
			}
		}
	`);

	// Handle errors
	if (pageResult.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	pageResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.slug,
			component: pageTemplate,
			context: {
				// additional data can be passed via context
				slug: node.frontmatter.slug,
			},
		});
	});

	const contactResult = await graphql(`
		{
			allMarkdownRemark(filter: { frontmatter: { slug: { eq: "kontakt" } } }) {
				edges {
					node {
						frontmatter {
							slug
						}
					}
				}
			}
		}
	`);

	// Handle errors
	if (contactResult.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	contactResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.slug,
			component: contactTemplate,
			context: {
				// additional data can be passed via context
				slug: node.frontmatter.slug,
			},
		});
	});
};

const express = require('express');

exports.onCreateDevServer = ({ app }) => {
	app.use('/admin', express.static('public/admin'));
};
