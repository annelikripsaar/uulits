import { defineConfig } from 'tinacms';
import { alamen__Fields } from './templates';
import { kontaktFields } from './templates';
import { men__Fields } from './templates';
import { food_truck_lehtFields } from './templates';
import { tavaline_lehtFields } from './templates';

// Your hosting provider likely exposes this as an environment variable
const branch = 'master';

export default defineConfig({
	branch,
	clientId: process.env.TINA_CLIENT_ID,
	token: process.env.TINA_TOKEN,
	client: { skip: true },
	build: {
		outputFolder: 'admin',
		publicFolder: 'static',
	},
	media: {
		tina: {
			mediaRoot: '',
			publicFolder: 'static',
		},
	},
	schema: {
		collections: [
			{
				format: 'md',
				label: 'Lehed',
				name: 'lehed',
				path: 'content',
				match: {
					include: '**/*',
					exclude: '!(menyy)/*',
				},
				templates: [
					{
						fields: [
							{
								type: 'rich-text',
								name: 'body',
								label: 'Body of Document',
								description: 'This is the markdown body',
								isBody: true,
							},
							...tavaline_lehtFields(),
						],
						label: 'tavaline-leht',
						name: 'tavaline_leht',
					},
					{
						fields: [
							{
								type: 'rich-text',
								name: 'body',
								label: 'Body of Document',
								description: 'This is the markdown body',
								isBody: true,
							},
							...alamen__Fields(),
						],
						label: 'alamenuu',
						name: 'alamenuu',
					},
					{
						fields: [
							{
								type: 'rich-text',
								name: 'body',
								label: 'Body of Document',
								description: 'This is the markdown body',
								isBody: true,
							},
							...men__Fields(),
						],
						label: 'menus',
						name: 'menus',
					},
					{
						fields: [
							{
								type: 'rich-text',
								name: 'body',
								label: 'Body of Document',
								description: 'This is the markdown body',
								isBody: true,
							},
							...kontaktFields(),
						],
						label: 'kontakt',
						name: 'kontakt',
					},
					{
						fields: [
							{
								type: 'rich-text',
								name: 'body',
								label: 'Body of Document',
								description: 'This is the markdown body',
								isBody: true,
							},
							...food_truck_lehtFields(),
						],
						label: 'pages',
						name: 'pages',
					},
				],
			},
		],
	},
});
