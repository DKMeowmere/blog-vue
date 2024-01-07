import { defineConfig } from "vitest/config"

export default defineConfig({
	root: ".",
	test: {
		clearMocks: true,
		exclude: [
			"__tests__/components/**",
			"__tests__/fixtures/**",
			"__tests__/coverage/**",
			"__tests__/logs/**",
		],
		include: ["__tests__/**"],
	},
})
