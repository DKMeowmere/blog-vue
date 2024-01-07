import { Response } from "express"
import { CustomError } from "../../types/customError"
import { NODE_ENV } from "../config/envVariables"
import { UNIVERSAL_ERROR } from "../config/constants/universalErrors"

const { statusCode, message } = UNIVERSAL_ERROR

export function handleControllerError(res: Response, err: unknown) {
	NODE_ENV === "DEVELOPMENT" && console.log(err)

	if (err instanceof CustomError) {
		res.status(err.statusCode).json({ error: err.message })
	} else if (NODE_ENV === "DEVELOPMENT" || NODE_ENV === "TEST") {
		res.status(statusCode).json({
			error: err instanceof Error ? err.message : message,
		})
	} else {
		res.status(UNIVERSAL_ERROR.statusCode).json({ error: message })
	}
}
