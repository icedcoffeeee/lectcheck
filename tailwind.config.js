import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,ts,svelte}'],
	theme: {
		extend: {}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#1d4ed8',
					secondary: '#93c5fd',
					accent: '#6d28d9',
					neutral: '#18181b',
					'base-100': '#dbeafe'
				}
			}
		]
	}
};
