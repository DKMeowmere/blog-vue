import { Theme } from "@backend/types/client/theme"

export const darkTheme: Theme = {
	type: "dark",
	media: {
		breakpoints: {
			xs: "0px",
			sm: "600px",
			md: "900px",
			lg: "1200px",
			xl: "1536px",
		},
		containerWidth: {
			xs: "90%",
			sm: "90%",
			md: "80%",
			lg: "1080px",
			xl: "1380px",
		},
	},
	colors: {
		text: "#f8f8f8",
		contrastText: "#080808",
		whiteText: "#f8f8f8",
		blackText: "#080808",
		main: "#0f6bff",
		lightMainBg: "#3a3a3a",
		mainBg: "#282828",
		darkMainBg: "#1d1d1d",
		contrastMainBg: "#f9f9f9",
		errorMain: "#da5252",
		errorSecondary: "#fdeded",
		warningMain: "#ee7f23",
		warningSecondary: "#fff4e5",
		successMain: "#458b49",
		successSecondary: "#edf7ed",
		infoMain: "#319eda",
		infoSecondary: "#e5f6fd",
	},
}