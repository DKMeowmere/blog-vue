import { Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { User } from "../../models/user"
import { TOKEN_SECRET } from "../../config/envVariables"
import {
	LOGIN_FAILED,
	USER_IN_TOKEN_NOT_FOUND,
	USER_NOT_FOUND,
} from "../../config/constants/userError"
import { handleControllerError } from "../../utils/handleControllerError"
import { createToken } from "../../utils/createToken"

export async function login(req: CustomRequest, res: Response) {
	try {
		const { email, password } = req.body
		const authorization = req.headers.authorization

		if (authorization) {
			loginWithToken(req, res)
			return
		}

		if (!email || !password) {
      console.log("LOGIN_FAILED")
			throw new CustomError(LOGIN_FAILED)
		}
		const user = await User.findOne({ email })

		if (!user) {
			throw new CustomError(USER_NOT_FOUND)
		}

		const isProvidedPasswordCorrect = await bcrypt.compare(
			password,
			user.password
		)

		if (!isProvidedPasswordCorrect) {
			throw new CustomError(LOGIN_FAILED)
		}

		const token = createToken(user.toJSON())
		res.json({ token, user })
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}

async function loginWithToken(req: CustomRequest, res: Response) {
	const authorization = req.headers.authorization
	const token = authorization?.split(" ")[1] || ""
	const payload = jwt.verify(token, TOKEN_SECRET) as JwtPayload
	const user = await User.findById(payload._id)

	if (!user) {
		throw new CustomError(USER_IN_TOKEN_NOT_FOUND)
	}

	const newToken = createToken(user.toJSON())
	user.password = ""
	res.json({ token: newToken, user })
}
