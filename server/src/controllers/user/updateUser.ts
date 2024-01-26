import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { User } from "../../models/user"
import { USER_NOT_FOUND } from "../../config/constants/userError"
import { handleControllerError } from "../../utils/handleControllerError"
import { writeIdFile } from "../../utils/files/writeIdFile"
import { authorizate } from "../../utils/authorize"

export async function updateUser(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const { name, biography } = req.body

		const user = await User.findById(id).populate("userBlogs")

		if (!user) {
			throw new CustomError(USER_NOT_FOUND)
		}

		const error = authorizate(req.user?._id, user._id)

		if (error) {
			throw new CustomError(error)
		}

		if (name) {
			if (name.length > 20) {
				throw new CustomError(USER_NOT_FOUND)
			}

			user.name = name
		}

		if (biography) {
			user.biography = biography
		}

		if (req.file) {
			const fileLocation = await writeIdFile(user._id, req.file)
			user.fileLocation = fileLocation
		}

		await user.save()

		user.password = ""
		res.json(user)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
