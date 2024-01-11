import { NextFunction, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { CustomRequest } from "../../types/customRequest"
import { CustomError } from "../../types/customError"
import { User } from "../models/user"
import {
	AUTH_NEEDED,
	USER_IN_TOKEN_NOT_FOUND,
} from "../config/constants/userError"
import { TOKEN_SECRET } from "../config/envVariables"
import { handleControllerError } from "../utils/handleControllerError"

export async function requireAuth(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization?.split(" ")[1]

		if (!token) {
			throw new CustomError(AUTH_NEEDED)
		}

		const payload = jwt.verify(token, TOKEN_SECRET) as JwtPayload
		const user = await User.findById(payload._id)

		if (!user) {
			throw new CustomError(USER_IN_TOKEN_NOT_FOUND)
		}

		req.user = user
		next()
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
