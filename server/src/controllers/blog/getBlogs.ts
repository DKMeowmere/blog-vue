import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { handleControllerError } from "../../utils/handleControllerError"
import { Blog } from "../../models/blog"

export async function getBlogs(req: CustomRequest, res: Response) {
	try {
		const { limit } = req.query
		const blogs = await Blog.find({ "content.0": { $exists: true } })
			.sort({ createdAt: -1 })
			.limit(parseInt(limit?.toString() || "0"))
      
		res.json(blogs)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
