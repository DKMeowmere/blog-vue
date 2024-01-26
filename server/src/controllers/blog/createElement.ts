import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import { BLOG_NOT_FOUND } from "../../config/constants/blogError"
import { AUTH_NEEDED } from "../../config/constants/userError"
import { Blog } from "../../models/blog"
import { handleControllerError } from "../../utils/handleControllerError"
import { authorizate } from "../../utils/authorize"
import { writeIdFile } from "../../utils/files/writeIdFile"
import { validateElement } from "../../utils/validateBlogElement"

export async function createElement(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const element = req.body
		const blog = await Blog.findById(id)
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

		if (req.file) {
			const fileLocation = await writeIdFile(element._id, req.file)
			element.fileLocation = fileLocation
		}

		blog.content.push(element)
		await blog.save()
		res.status(201).json(blog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
