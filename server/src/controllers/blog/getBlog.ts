import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { BLOG_NOT_FOUND } from "../../config/constants/blogError"
import { Blog } from "../../models/blog"
import { handleControllerError } from "../../utils/handleControllerError"

export async function getBlog(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const blog = await Blog.findById(id)

		if (!blog) {
			throw new CustomError(BLOG_NOT_FOUND)
		}

		res.json(blog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
