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
}

export const useAppStore = defineStore("app", {
	state: () => initialState,
	actions: {
		setupTheme() {
			const themeType = window.localStorage.getItem("theme")

			if (themeType === "DARK") {
				this.theme = darkTheme
			} else {
				this.theme = lightTheme
			}
		},
		switchTheme() {
			if (this.theme.type === "LIGHT") {
				this.theme = darkTheme
				localStorage.setItem("theme", "DARK")
			} else {
				this.theme = lightTheme
				localStorage.setItem("theme", "LIGHT")
			}
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
		setUser(user: UserType) {
			this.user = user
		},
	},
})
