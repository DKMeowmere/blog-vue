import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { Blog } from "../../../src/models/blog"
import { generateBlog } from "../../fixtures/generateBlog"

export async function getBlogs(app: Express) {
	beforeEach(async () => {
		await Blog.create(generateBlog(["TEXT", "LIST"]))
		await Blog.create(generateBlog(["QUOTE", "IMAGE"]))
		await Blog.create(generateBlog(["SUBTITLE", "LIST"]))
	})
	describe("given the 3 documents", () => {
		it("should return 200 and 3 blogs", async () => {
			const { statusCode, body } = await request(app).get("/api/blog")

			expect(statusCode).toBe(200)
			expect(body).toHaveLength(3)
		})
	})
	describe("given the 3 documents with limit 2", () => {
		it("should return 200 and 2 blogs", async () => {
			const { statusCode, body } = await request(app).get("/api/blog?limit=2")
			expect(statusCode).toBe(200)
			expect(body).toHaveLength(2)
		})
	})
}
