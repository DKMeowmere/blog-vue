import { Alert } from "@backend/types/client/alert"
import { useAppStore } from "../stores/appStore"

export function useHandleError() {
	const appState = useAppStore()
	const { enqueueAlert, endLoading } = appState

	function handleError() {
		endLoading()
	}

	function handleErrorWithAlert(alert: Omit<Alert, "id">) {
		enqueueAlert(alert)
		endLoading()
	}

	return { handleError, handleErrorWithAlert }
}
