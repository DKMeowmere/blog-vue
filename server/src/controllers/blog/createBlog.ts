import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { ElementType } from "../../../types/blog/element"
import { blogValidationSchema } from "../../../types/blog/blog"
import { CustomError } from "../../../types/customError"
import { Blog } from "../../models/blog"
import { User } from "../../models/user"
import { FILES_UPLOAD_ERROR } from "../../config/constants/universalErrors"
import { MAIN_BLOG_FILE_MISSING } from "../../config/constants/blogError"
import { handleControllerError } from "../../utils/handleControllerError"
import { createFilesMap } from "../../utils/files/createFilesMap"
import { writeIdFile } from "../../utils/files/writeIdFile"
import { getZodErrorMessage } from "../../utils/getZodErrorMessage"

export async function createBlog(req: CustomRequest, res: Response) {
	try {
		const _id = crypto.randomUUID()
		const content = JSON.parse(req.body.content).map(
			(element: ElementType) => ({ ...element, _id: crypto.randomUUID() })
		)
		const authorId = req.user?._id
		const uniqueTags = Array.from(new Set(JSON.parse(req.body.tags || '[]')))

		const result = blogValidationSchema.safeParse({
			...req.body,
			_id,
			author: authorId,
			content,
			likes: 0,
			tags: uniqueTags,
		})

		if (!result.success) {
			throw new CustomError({
				statusCode: 400,
				message: getZodErrorMessage(result.error.message),
			})
		}

		if (!req.files || !Array.isArray(req.files)) {
			throw new CustomError(FILES_UPLOAD_ERROR)
		}
		const blog = result.data
		const files = createFilesMap(req.files as Express.Multer.File[])
		const mainFile = files.get(blog.mainFileLocation)

		if (!mainFile) {
			throw new CustomError(MAIN_BLOG_FILE_MISSING)
		}
		const mainFilePath = await writeIdFile(_id, mainFile)
		blog.mainFileLocation = mainFilePath

		for (let i = 0; i < blog.content.length; i++) {
			const element = blog.content[i]

			if (element.type === "IMAGE") {
				const file = files.get(element.fileLocation)

				if (file) {
					const filePath = await writeIdFile(element._id, file)
					element.fileLocation = filePath
				} else {
					element.fileLocation = "404.png"
				}
			}
		}

		const mongoBlog = await Blog.create(blog)
		await User.findByIdAndUpdate(authorId, {
			$push: { userBlogs: blog._id },
		})
		res.json(mongoBlog)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
