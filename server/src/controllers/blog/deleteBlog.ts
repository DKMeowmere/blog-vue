import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { BLOG_NOT_FOUND } from "../../config/constants/blogError"
import { Blog } from "../../models/blog"
import { handleControllerError } from "../../utils/handleControllerError"
import { authorizate } from "../../utils/authorize"
import { User } from "../../models/user"
import { removeFile } from "../../utils/files/removeFile"
import path from "path"

export async function deleteBlog(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const blog = await Blog.findById(id)

		if (!blog) {
			throw new CustomError(BLOG_NOT_FOUND)
		}
		const error = authorizate(req.user?._id, blog.author)

		if (error) {
			throw new CustomError(error)
		}

		await removeFile(path.resolve(`.${blog.mainFileLocation}`))
		for (let i = 0; i < blog.content.length; i++) {
			const element = blog.content[i]

			if (element.type === "IMAGE") {
				await removeFile(path.resolve(`.${element.fileLocation}`))
			}
		}

		await User.findByIdAndUpdate(blog.author, {
			$pull: { userBlogs: blog._id },
		})
		res.json(blog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
