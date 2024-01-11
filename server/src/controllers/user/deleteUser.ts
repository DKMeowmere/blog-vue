import { Response } from "express"
import path from "path"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { User } from "../../models/user"
import { USER_NOT_FOUND } from "../../config/constants/userError"
import { handleControllerError } from "../../utils/handleControllerError"
import { removeFile } from "../../utils/files/removeFile"
import { authorizate } from "../../utils/authorize"

export async function deleteUser(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params

		authorizate(req.user?._id, id)

		const user = await User.findById(id)

		if (!user) {
			throw new CustomError(USER_NOT_FOUND)
		}

		if (user.fileLocation) {
			await removeFile(path.resolve(`.${user.fileLocation}`))
		}

		user.password = ""
		await User.findByIdAndDelete(id)
		res.json(user)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
