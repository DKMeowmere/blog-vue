import { UNIVERSAL_ERROR } from "../config/constants/universalErrors"

export function getZodErrorMessage(err: any) {
	try {
		const zodError = JSON.parse(err)
		const { message, path, expected, received } = zodError[0]

		return `${message} ${path.join(
			", "
		)}. Expected: ${expected} - received ${received}.`
	} catch {
		return UNIVERSAL_ERROR.message
	}
}
