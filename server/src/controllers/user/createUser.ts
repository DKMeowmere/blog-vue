import { Response } from "express"
import bcrypt from "bcrypt"
import { CustomRequest } from "../../../types/customRequest"
import { userSchemaPostValidation } from "../../../types/user"
import { CustomError } from "../../../types/customError"
import { SALT_ROUNDS } from "../../config/envVariables"
import { User } from "../../models/user"
import { getZodErrorMessage } from "../../utils/getZodErrorMessage"
import { handleControllerError } from "../../utils/handleControllerError"
import { writeIdFile } from "../../utils/files/writeIdFile"
import { createToken } from "../../utils/createToken"

export async function createUser(req: CustomRequest, res: Response) {
	try {
		const _id = crypto.randomUUID()
		const result = userSchemaPostValidation.safeParse({ ...req.body, _id })

		if (!result.success) {
			throw new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}

		const fileLocation = await writeIdFile(_id, req.file)

		const hash = await bcrypt.hash(result.data.password, SALT_ROUNDS)
		const user = await User.create({
			...result.data,
			fileLocation,
			password: hash,
		})
		user.password = ""

		const token = createToken(user.toJSON())

		res.status(201).json({ user, token })
	} catch (err) {
		handleControllerError(res, err)
	}
}
