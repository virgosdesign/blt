import { SITE } from './src/config.mjs';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import image from '@astrojs/image';
import partytown from '@astrojs/partytown';
import path from 'path';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	// Astro uses this full URL to generate your sitemap and canonical URLs in your final build
	site: SITE.origin,
	// base: SITE.basePathname,

	output: 'static',

	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		sitemap(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
			// supported levels: 'debug' | 'info' | 'warn' | 'error' | 'silent'
			logLevel: 'debug',
		}),

		/* Disable this integration if you don't use Google Analytics (or other external script). */
		/* partytown({
			config: { forward: ['dataLayer.push'] },
		}), */
	],

	vite: {
		ssr: {
			external: ['@11ty/eleventy-img'],
		},
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
