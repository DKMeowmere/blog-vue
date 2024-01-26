import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { CustomError } from "../../../types/customError"
import {
  BLOG_CONTENT_MUST_NOT_BE_EMPTY,
	BLOG_NOT_FOUND,
	ELEMENT_NOT_FOUND,
} from "../../config/constants/blogError"
import { AUTH_NEEDED } from "../../config/constants/userError"
import { Blog } from "../../models/blog"
import { handleControllerError } from "../../utils/handleControllerError"
import { authorizate } from "../../utils/authorize"
import { removeFile } from "../../utils/files/removeFile"

export async function deleteElement(req: CustomRequest, res: Response) {
	try {
		const { blogId, elementId } = req.params
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

    if(blog.content.length === 1){
      throw new CustomError(BLOG_CONTENT_MUST_NOT_BE_EMPTY)

    }

		const elementIndex = blog.content.findIndex(
			prevElement => (prevElement._id === elementId)
		)
		const element = blog.content[elementIndex]

		if (!element) {
			throw new CustomError(ELEMENT_NOT_FOUND)
		}

		if (element.type === "IMAGE" && element.fileLocation) {
			await removeFile(`./${element.fileLocation}`)
		}

		blog.content.splice(elementIndex, 1)
		await blog.save()
		res.json(blog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
