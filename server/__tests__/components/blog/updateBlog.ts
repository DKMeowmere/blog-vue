import request from "supertest"
import { Express } from "express"
import { beforeEach, it, describe, expect } from "vitest"
import { generateUser } from "../../fixtures/generateUser"
import { generateBlog } from "../../fixtures/generateBlog"
import { User } from "../../../src/models/user"
import { Blog } from "../../../src/models/blog"
import { createToken } from "../../../src/utils/createToken"
import { blogSchema } from "../../../types/blog/blog"

export async function updateBlog(app: Express) {
	const user = generateUser()
	const token = `Bearer ${createToken(user)}`
	const blog = generateBlog(["TEXT"])
	const { _id, title } = blog

	beforeEach(async () => {
		await Blog.create({ ...blog, author: user._id })
		await User.create({ ...user, userBlogs: [blog._id] })
	})

	describe("given the id of non existing blog", () => {
		it("should return 404", async () => {
			const { statusCode } = await request(app)
				.patch("/api/blog/non-existing-id")
				.set("Authorization", token)
				.set("content-type", "multipart/form-data")
				.field("title", title)

			expect(statusCode).toBe(404)
		})
	})
	describe("given the blog payload without token", () => {
		it("should return 401", async () => {
			const { statusCode } = await request(app)
				.patch(`/api/blog/${_id}`)
				.set("content-type", "multipart/form-data")
				.field("title", title)

			expect(statusCode).toBe(401)
		})
	})
	describe("given the blog with another user's token", () => {
		it("should return 403", async () => {
			const userPayload2 = generateUser()
			await User.create(userPayload2)
			const token2 = `Bearer ${createToken(userPayload2)}`

			const { statusCode } = await request(app)
				.patch(`/api/blog/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token2)
				.field("title", title)

			expect(statusCode).toBe(403)
		})
	})
	describe("given the blog payload", () => {
		it("should return 200 and blog", async () => {
			const { statusCode, body: blog } = await request(app)
				.patch(`/api/blog/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("title", "UPDATED TITLE")
				.attach("file", "__tests__/fixtures/files/test.png")

			const { success } = blogSchema.safeParse(blog)
			expect(statusCode).toBe(200)
			expect(success).toBeTruthy()
			expect(blog.title).toBe("UPDATED TITLE")

			const fileRes = await request(app).get(blog.mainFileLocation)
			expect(fileRes.status).toBe(200)
		})
	})
}
