import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { User } from "../../models/user"
import { USER_NOT_FOUND } from "../../config/constants/userError"
import { handleControllerError } from "../../utils/handleControllerError"

export async function getUser(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params

		const user = await User.findById(id)

		if (!user) {
			throw new CustomError(USER_NOT_FOUND)
		}

    //populate blogs
		user.password = ""
		res.json(user)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
