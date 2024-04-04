import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import {
	BLOG_NOT_FOUND,
	ELEMENT_NOT_FOUND,
} from "../../config/constants/blogError"
import { AUTH_NEEDED } from "../../config/constants/userError"
import { Blog } from "../../models/blog"
import { handleControllerError } from "../../utils/handleControllerError"
import { authorizate } from "../../utils/authorize"
import { writeIdFile } from "../../utils/files/writeIdFile"
import { validateElement } from "../../utils/validateBlogElement"

export async function updateElement(req: CustomRequest, res: Response) {
	try {
		const { blogId, elementId } = req.params
		const element = req.body
		const blog = await Blog.findById(blogId)

		if (!blog) {
			throw new CustomError(BLOG_NOT_FOUND)
		}

		if (!req.user) {
			throw new CustomError(AUTH_NEEDED)
		}

		const authorizationError = authorizate(blog.author, req.user._id)

		if (authorizationError) {
			throw new CustomError(authorizationError)
		}

		const validationError = validateElement(element)

		if (validationError) {
			throw new CustomError(validationError)
		}

		const elementIndex = blog.content.findIndex(
			prevElement => (prevElement._id === elementId)
		)

		if (elementIndex == -1) {
			throw new CustomError(ELEMENT_NOT_FOUND)
		}

		const prevElementId = blog.content[elementIndex]._id
		blog.content[elementIndex] = { ...element, _id: prevElementId }

		if (req.file) {
			const fileLocation = await writeIdFile(element._id, req.file)
			element.fileLocation = fileLocation
		}

    blog.markModified("content")
		await blog.save()
		res.json(blog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
