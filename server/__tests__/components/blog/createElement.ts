import request from "supertest"
import { Express } from "express"
import { beforeEach, it, describe, expect } from "vitest"
import { generateUser } from "../../fixtures/generateUser"
import { generateBlog, textElement } from "../../fixtures/generateBlog"
import { User } from "../../../src/models/user"
import { Blog } from "../../../src/models/blog"
import { createToken } from "../../../src/utils/createToken"
import { blogSchema } from "../../../types/blog/blog"

export async function createElement(app: Express) {
	const user = generateUser()
	const token = `Bearer ${createToken(user)}`
	const blog = generateBlog(["TEXT"])
	const { _id } = blog
	const { body, type } = textElement

	beforeEach(async () => {
		await Blog.create({ ...blog, author: user._id })
		await User.create({ ...user, userBlogs: [blog._id] })
	})

	describe("given the element payload without token", () => {
		it("should return 401", async () => {
			const { statusCode } = await request(app)
				.post(`/api/blog/${_id}`)
				.set("content-type", "multipart/form-data")
				.field("body", body)
				.field("type", type)

			expect(statusCode).toBe(401)
		})
	})
	describe("given the element with another user's token", () => {
		it("should return 403", async () => {
			const userPayload2 = generateUser()
			await User.create(userPayload2)
			const token2 = `Bearer ${createToken(userPayload2)}`

			const { statusCode } = await request(app)
				.post(`/api/blog/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token2)
				.field("body", body)
				.field("type", type)

			expect(statusCode).toBe(403)
		})
	})
	describe("given the element payload", () => {
		it("should return 200 and blog", async () => {
			const { statusCode, body: blog } = await request(app)
				.post(`/api/blog/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("body", body)
				.field("type", type)

			const { success } = blogSchema.safeParse(blog)
			expect(statusCode).toBe(201)
			expect(success).toBeTruthy()
			expect(blog.content).toHaveLength(2)
		})
	})
}
