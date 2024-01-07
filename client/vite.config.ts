import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "url"

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [vue()],
	build: {
		outDir: "../server/dist",
		rollupOptions: {
			output: {
				entryFileNames: "static/js/[name]-[hash].js",
			},
		},
	},
	resolve: {
		alias: [
			{
				find: "@backend",
				replacement: fileURLToPath(new URL("../server", import.meta.url)),
			},
		],
	},
})
