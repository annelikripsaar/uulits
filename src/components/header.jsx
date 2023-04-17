import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import TopBar from './TopBar';
import { Social } from './Social';
import styled from '@emotion/styled';
import { screenSize } from '../styles/screenSize';

const Container = styled.div``;

const HeaderSocial = styled(Social)`
	position: absolute;
	top: 4vw;
	right: 4vw;

	${screenSize.sm} {
		display: none;
	}
`;

const Nav = styled.ul`
	width: 60%;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: space-between;
	padding: 0;
	flex-wrap: wrap;

	li {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		list-style-type: none;
		border-radius: 100%;
		border: 1.5px solid #272525;
		margin: 0 2px;

		a {
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: center;
			text-decoration: none;
			text-transform: uppercase;
			font-weight: 400;
			font-size: 0.875rem;
			text-align: center;
			color: inherit;
			width: 80px;
			height: 80px;
			padding: 2px;
		}

		&:hover {
			background-color: #272525;

			a {
				color: white;
			}
		}
	}

	${screenSize.sm} {
		li {
			margin-bottom: 24px;
		}
	}
`;

const ListItem = styled.li`
	${(p) => (p.active ? 'background-color: #272525;' : '')}

	&& a {
		${(p) => (p.active ? 'color: white;' : '')}
	}
`;

const ListLink = (props) => {
	const [iconActive, setIconActive] = useState(false);

	return (
		<ListItem active={iconActive}>
			<Link
				to={props.to}
				getProps={({ isCurrent }) => {
					isCurrent ? setIconActive(true) : setIconActive(false);
				}}
			>
				{props.children}
			</Link>
		</ListItem>
	);
};

const TruckIcon = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	list-style-type: none;
	height: 80px;
	background-image: url('/icons/truck.svg');
	background-repeat: no-repeat;
	background-size: contain;
	background-position-y: center;
	padding: 0 20px 0 40px;
	margin: 0 0px 0 -20px;

	a {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		text-transform: uppercase;
		font-weight: 400;
		font-size: 0.875rem;
		text-align: center;
		color: inherit;
		width: 80px;
		height: 80px;
		padding: 2px;
	}

	${(p) => (p.active ? "background-image: url('/icons/truck-black.svg');" : '')}

	a {
		${(p) => (p.active ? 'color: white;' : '')}
	}

	&:hover {
		background-image: url('/icons/truck-black.svg');

		a {
			color: white;
		}
	}
`;

const TruckLink = (props) => {
	const [iconActive, setIconActive] = useState(false);

	return (
		<TruckIcon active={iconActive}>
			<Link
				to={props.to}
				getProps={({ isCurrent }) => {
					isCurrent ? setIconActive(true) : setIconActive(false);
				}}
			>
				{props.children}
			</Link>
		</TruckIcon>
	);
};

const ShopLink = styled.li`
	background-color: #272525;
	background-image: url('/icons/e_pood_1.png');
	background-size: contain;

	a {
		opacity: 0;
	}

	:hover {
		background-image: url('/icons/e_pood_2.png');
	}
`;

export default function Header() {
	const data = useStaticQuery(graphql`
		query NavQuery {
			allMarkdownRemark(
				filter: { frontmatter: { slug: { ne: "home" }, in_nav: { ne: false } } }
				sort: { order: ASC, fields: frontmatter___order }
			) {
				edges {
					node {
						frontmatter {
							title
							slug
						}
					}
				}
			}
		}
	`);

	return (
		<Container>
			<HeaderSocial color="#272525" />
			<TopBar />
			<Nav>
				<ShopLink>
					<a href={'https://pood.uulits.ee/'} target="_blank">
						E-pood
					</a>
				</ShopLink>
				{data.allMarkdownRemark.edges.map(({ node }, index) => {
					if (node.frontmatter.slug === 'foodtruck') {
						return (
							<TruckLink to={'/' + node.frontmatter.slug} key={index}>
								{node.frontmatter.title}
							</TruckLink>
						);
					} else if (node.frontmatter.slug === "kadaka") {
						return (
							<ListItem active={false}>
								<a href="https://kadaka.uulits.ee/" target="_blank">{node.frontmatter.title}</a>
							</ListItem>	
						)
					} else {
						return (
							<ListLink to={'/' + node.frontmatter.slug} key={index}>
								{node.frontmatter.title}
							</ListLink>
						);
					}
				})}
			</Nav>
		</Container>
	);
}
