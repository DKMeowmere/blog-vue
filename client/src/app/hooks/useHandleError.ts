import { useAppStore } from "../stores/appStore"

export function useHandleError() {
	const appState = useAppStore()
	const { enqueueAlert, endLoading } = appState

	function handleError() {
		endLoading()
	}

	function handleErrorWithAlert(message: string) {
		enqueueAlert({ body: message, type: "ERROR" })
		endLoading()
	}

	return { handleError, handleErrorWithAlert }
}
