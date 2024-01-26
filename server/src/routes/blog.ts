import { Router } from "express"
import { UploadOptions } from "../../types/uploadOptions"
import { uploadFile } from "../middlewares/uploadFile"
import { requireAuth } from "../middlewares/auth"
import { createBlog } from "../controllers/blog/createBlog"
import { getBlog } from "../controllers/blog/getBlog"
import { getBlogs } from "../controllers/blog/getBlogs"
import { updateBlog } from "../controllers/blog/updateBlog"
import { deleteBlog } from "../controllers/blog/deleteBlog"
import { createElement } from "../controllers/blog/createElement"
import { updateElement } from "../controllers/blog/updateElement"
import { deleteElement } from "../controllers/blog/deleteElement"

export const blogRouter = Router()

const uploadOptions: UploadOptions = {
	type: "ARRAY",
}

blogRouter
	.route("/")
	.get(getBlogs)
	.post(
		requireAuth,
		(res, req, next) => uploadFile(res, req, next, uploadOptions),
		createBlog
	)
blogRouter
	.route("/:id")
	.get(getBlog)
	.post(requireAuth, uploadFile, createElement)
	.patch(requireAuth, uploadFile, updateBlog)
	.delete(requireAuth, deleteBlog)

blogRouter
	.route("/:blogId/:elementId")
	.patch(requireAuth, uploadFile, updateElement)
	.delete(requireAuth, uploadFile, deleteElement)
