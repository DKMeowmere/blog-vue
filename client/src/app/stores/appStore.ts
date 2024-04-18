import { defineStore } from "pinia"
import { AppState } from "@backend/types/client/appState"
import { Alert } from "@backend/types/client/alert"
import { UserType } from "@backend/types/user"
import { lightTheme } from "../style/themes/lightTheme"
import { darkTheme } from "../style/themes/darkTheme"

const initialState: AppState = {
	isLoading: false,
	theme: lightTheme,
	user: null,
	alertsQueue: [],
	alertLifeTime: 7000,
	token: "",
}

export const useAppStore = defineStore("app", {
	state: () => initialState,
	actions: {
		setupTheme() {
			const themeType = window.localStorage.getItem("theme")

			if (themeType === "DARK") {
				localStorage.setItem("theme", "dark")
				this.theme = darkTheme
			} else {
				localStorage.setItem("theme", "light")
				this.theme = lightTheme
			}

			themeType && document.querySelector("html")?.classList.add(themeType)
		},
		switchTheme() {
			const htmlElement = document.querySelector("html")
			this.theme.type && htmlElement?.classList.remove(this.theme.type)

			if (this.theme.type === "light") {
				this.theme = darkTheme
				localStorage.setItem("theme", "dark")
			} else {
				this.theme = lightTheme
				localStorage.setItem("theme", "light")
			}
			this.theme.type && htmlElement?.classList.add(this.theme.type)
		},
		startLoading() {
			this.isLoading = true
		},
		endLoading() {
			this.isLoading = false
		},
		enqueueAlert(payload: Omit<Alert, "id">) {
			const id = crypto.randomUUID()
			this.alertsQueue.push({
				...payload,
				id,
			})
		},
		deleteAlert(id: string) {
			this.alertsQueue = this.alertsQueue.filter(alert => alert.id !== id)
		},
		dequeueAlert() {
			this.alertsQueue.shift()
		},
		setUser(user: UserType | null) {
			this.user = user
			localStorage.setItem("user", JSON.stringify(user))
		},
		setToken(token: string) {
			this.token = token
		},
	},
})
