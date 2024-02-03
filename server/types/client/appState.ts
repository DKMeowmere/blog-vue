import { Theme } from "./theme"
import { UserType } from "../user"
import { Alerts } from "./alert"

export type AppState = {
	isLoading: boolean
	theme: Theme
	user: UserType | null
	alertsQueue: Alerts
	alertLifeTime: number
}
