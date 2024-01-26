import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { Blog } from "../../../src/models/blog"
import { generateBlog } from "../../fixtures/generateBlog"
import { blogSchema } from "../../../types/blog/blog"

export async function getBlog(app: Express) {
	const blogPayload = generateBlog(["TEXT"])
	const { _id } = blogPayload

	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.create(blogPayload)
	})

	describe("given the user id", () => {
		it("should return 200 and blog", async () => {
			const { statusCode, body: blog } = await request(app).get(
				`/api/blog/${_id}`
			)
			const { success } = blogSchema.safeParse(blog)

			expect(success).toBeTruthy()
			expect(statusCode).toBe(200)
		})
	})
	describe("given the id of non existing blog", () => {
		it("should return 404", async () => {
			const id = "404"
			const { statusCode } = await request(app).get(`/api/blog/${id}`)
			expect(statusCode).toBe(404)
		})
	})
}
