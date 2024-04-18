/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				whiteText: "#f8f8f8",
				blackText: "#080808",
				main: "#0f6bff",
				"lightMainBg-400": "#fff",
				"lightMainBg-500": "#e8e8e8",
				"lightMainBg-600": "#d1d1d1",
				"darkMainBg-400": "#3a3a3a",
				"darkMainBg-500": "#282828",
				"darkMainBg-600": "#1d1d1d",
				errorMain: "#da5252",
				errorSecondary: "#fdeded",
				warningMain: "#ee7f23",
				warningSecondary: "#fff4e5",
				successMain: "#458b49",
				successSecondary: "#edf7ed",
				infoMain: "#319eda",
				infoSecondary: "#e5f6fd",
			},
		},
	},
	plugins: [],
}
