import { describe, beforeAll, afterAll, beforeEach } from "vitest"
import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { createServer } from "../src/utils/createServer"
import { createBlog } from "./components/blog/createBlog"
import { updateBlog } from "./components/blog/updateBlog"
import { getBlogs } from "./components/blog/getBlogs"
import { getBlog } from "./components/blog/getBlog"
import { deleteBlog } from "./components/blog/deleteBlog"
import { createElement } from "./components/blog/createElement"
import { updateElement } from "./components/blog/updateElement"
import { deleteElement } from "./components/blog/deleteElement"

describe("BLOG /api/blog", () => {
	const app = createServer({ saveLogs: true, logsFileName: "blog" })

	beforeAll(async () => {
		const mongodb = await MongoMemoryServer.create()
		const uri = mongodb.getUri()
		await mongoose.connect(uri)
	})
	beforeEach(async () => {
		await request(app).get("/api/reset")
	})
	afterAll(async () => {
		await mongoose.disconnect()
		await mongoose.connection.close()
	})

	describe("GET / getBlogs", () => getBlogs(app))
	describe("GET /:id getBlog", () => getBlog(app))
	describe("POST / createBlog", () => createBlog(app))
	describe("PATCH /:id updateBlog", () => updateBlog(app))
	describe("DELETE /:id deleteBlog", () => deleteBlog(app))
	describe("POST /:id createElement", () => createElement(app))
	describe("PATCH /:blogId/:elementId updateElement", () => updateElement(app))
	describe("DELETE /:blogId/:elementId deleteElement", () => deleteElement(app))
})
