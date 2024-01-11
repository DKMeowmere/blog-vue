import { AUTH_NEEDED } from "../config/constants/userError"
import { ACCESS_DENIED, ID_MISSING } from "../config/constants/universalErrors"

export function authorizate(userId?: string, resourseId?: string) {
	if (!userId) {
		return AUTH_NEEDED
	}

	if (!resourseId) {
		return ID_MISSING
	}

	if (userId !== resourseId) {
		return ACCESS_DENIED
	}

	return null
}
