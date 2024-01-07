import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "__tests__/coverage",
	coverageProvider: "v8",
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	modulePathIgnorePatterns: [
		"<rootDir>/__tests__/components",
		"<rootDir>/__tests__/fixtures",
		"<rootDir>/__tests__/coverage",
	],
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
}

export default config
