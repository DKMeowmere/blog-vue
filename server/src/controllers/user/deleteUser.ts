import { Response } from "express"
import path from "path"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { User } from "../../models/user"
import { Blog } from "../../models/blog"
import { USER_NOT_FOUND } from "../../config/constants/userError"
import { handleControllerError } from "../../utils/handleControllerError"
import { removeFile } from "../../utils/files/removeFile"
import { authorizate } from "../../utils/authorize"

export async function deleteUser(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const user = await User.findById(id)

		if (!user) {
			throw new CustomError(USER_NOT_FOUND)
		}

		const error = authorizate(req.user?._id, user._id)

		if (error) {
			throw new CustomError(error)
		}

		if (user.fileLocation) {
			await removeFile(path.resolve(`.${user.fileLocation}`))
		}

		user.password = ""
		const userBlogs = await Blog.find({ author: id })

		for (let i = 0; i < userBlogs.length; i++) {
			const blog = userBlogs[i]
			blog.author = ""
			blog.save()
		}

    user.userBlogs = userBlogs
		await User.findByIdAndDelete(id)
		res.json(user)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
