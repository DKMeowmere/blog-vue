import { SERVER_URL } from "../constants/urls"

export function validateServerUrl(url?: string | null) {
	if (!url) {
		return
	}

	if (!url.startsWith("http") && !url.startsWith("blob")) {
		return `${SERVER_URL}${url}`
	}

	return url
}
