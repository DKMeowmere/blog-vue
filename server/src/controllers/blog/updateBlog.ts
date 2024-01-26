import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { blogValidationSchema } from "../../../types/blog/blog"
import { BLOG_NOT_FOUND } from "../../config/constants/blogError"
import { AUTH_NEEDED } from "../../config/constants/userError"
import { Blog } from "../../models/blog"
import { handleControllerError } from "../../utils/handleControllerError"
import { authorizate } from "../../utils/authorize"
import { getZodErrorMessage } from "../../utils/getZodErrorMessage"
import { writeIdFile } from "../../utils/files/writeIdFile"

export async function updateBlog(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const blog = await Blog.findById(id)

		if (!blog) {
			throw new CustomError(BLOG_NOT_FOUND)
		}

		if (!req.user) {
			throw new CustomError(AUTH_NEEDED)
		}
		const error = authorizate(blog.author, req.user._id)

		if (error) {
			throw new CustomError(error)
		}

		const { title, source, tags } = req.body

		if (title) {
			blog.title = title
		}

		if (source) {
			blog.source = source
		}
		if (tags) {
			blog.tags = tags
		}

		const result = blogValidationSchema.safeParse(blog)

		if (!result.success) {
			throw new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}

		if (req.file) {
			const mainFileLocation = await writeIdFile(blog._id, req.file)
			blog.mainFileLocation = mainFileLocation
		}

		await blog.save()
		res.json(blog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
