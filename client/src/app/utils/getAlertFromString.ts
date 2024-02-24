import { AlertTypes } from "@backend/types/client/alert"

export function getAlertFromString(body: string, type: AlertTypes) {
	return {
		body,
		type,
	}
}
