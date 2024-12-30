export default defineNitroConfig({
	srcDir: "src",
	compatibilityDate: "2024-12-30",
	compressPublicAssets: {
		gzip: true,
		brotli: true,
	},
	publicAssets: [
		{
			baseURL: "assets",
			dir: "../dist/assets",
			maxAge: 365 * 24 * 60 * 60,
		},
		{
			dir: "../dist",
		},
	],
	serverAssets: [
		{
			baseName: "vite",
			dir: "../dist/.vite",
		},
	],
	routeRules: {
		"/": { redirect: "/top" },
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				skipLibCheck: true,
				jsx: "react-jsx",
				// dumb workaround because nitro's default tsconfig for some reason contains
				// jsxFactory/jsxFragmentFactory for nano-jsx
				jsxFactory: "",
				jsxFragmentFactory: "",
				jsxImportSource: "hono/jsx",
			},
		},
	},
	esbuild: {
		options: {
			jsx: "automatic",
			jsxImportSource: "hono/jsx",
		},
	},
});
