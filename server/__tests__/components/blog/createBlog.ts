import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { User } from "../../../src/models/user"
import { generateUser } from "../../fixtures/generateUser"
import { generateBlog } from "../../fixtures/generateBlog"
import { createToken } from "../../../src/utils/createToken"
import { blogSchema } from "../../../types/blog/blog"
import { ImageElementType } from "../../../types/blog/image"

export async function createBlog(app: Express) {
	const blog = generateBlog(["TEXT"])
	const { title, content } = blog
	const userPayload = generateUser()
	const token = `Bearer ${createToken(userPayload)}`

	beforeEach(async () => {
		await User.create(userPayload)
	})

	describe("given the blog payload with invalid file extension", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/blog")
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("title", title)
				.field("content", JSON.stringify(content))
				.field("mainFileLocation", "note.txt")
				.attach("files", "__tests__/fixtures/files/note.txt")

			expect(statusCode).toBe(400)
		})
	})
	describe("given the blog payload without token", () => {
		it("should return 401", async () => {
			const { statusCode } = await request(app)
				.post("/api/blog")
				.set("content-type", "multipart/form-data")
				.field("title", title)
				.field("content", JSON.stringify(content))
				.field("mainFileLocation", "test.png")

			expect(statusCode).toBe(401)
		})
	})
	describe("given the blog payload with text element", () => {
		it("should return 200", async () => {
			const { statusCode, body } = await request(app)
				.post("/api/blog")
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("title", title)
				.field("content", JSON.stringify(content))
				.field("mainFileLocation", "test.png")
				.attach("files", "__tests__/fixtures/files/test.png")

			expect(statusCode).toBe(200)
			const { success } = blogSchema.safeParse(body)
			expect(success).toBeTruthy()
		})
	})
	describe("given the blog payload with image element", () => {
		it("should return 200", async () => {
			const imageElement: ImageElementType = {
				_id: crypto.randomUUID(),
				type: "IMAGE",
				alt: "Alternate text",
				fileLocation: "test.png",
			}

			const { statusCode, body } = await request(app)
				.post("/api/blog")
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("title", title)
				.field("content", JSON.stringify([imageElement]))
				.field("mainFileLocation", "test.png")
				.attach("files", "__tests__/fixtures/files/test.png")

			expect(statusCode).toBe(200)
			const { success } = blogSchema.safeParse(body)
			expect(success).toBeTruthy()
		})
	})
	describe("given the blog payload without image element", () => {
		it("should return 200", async () => {
			const imageElement: ImageElementType = {
				_id: crypto.randomUUID(),
				type: "IMAGE",
				alt: "Alternate text",
				fileLocation: "404.png",
			}

			const { statusCode, body } = await request(app)
				.post("/api/blog")
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("title", title)
				.field("content", JSON.stringify([imageElement]))
				.field("mainFileLocation", "test.png")
				.attach("files", "__tests__/fixtures/files/test.png")

			expect(statusCode).toBe(200)
			const { success } = blogSchema.safeParse(body)
			expect(success).toBeTruthy()
			const fileLocation = body.content[0].fileLocation
			expect(fileLocation).toBe("404.png")
		})
	})
}
