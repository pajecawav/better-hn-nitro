import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const pwaManifest: Partial<ManifestOptions> = {
	name: "Better HN",
	short_name: "Better HN",
	description: "A Hacker News clone built with Nitro and Hono",
	icons: [
		{
			src: "/android-chrome-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "/android-chrome-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable",
		},
	],
	start_url: "/top",
	theme_color: "#18181b",
	background_color: "#18181b",
	display: "standalone",
	orientation: "portrait",
};

export default defineConfig({
	appType: "mpa",
	build: {
		manifest: true,
		rollupOptions: {
			input: "./src/client/index.ts",
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern",
			},
		},
	},
	plugins: [
		VitePWA({
			manifest: pwaManifest,
			injectRegister: "inline",
			workbox: {
				globPatterns: ["**/*.{js,css,ico,png,svg}"],
			},
		}),
	],
});
