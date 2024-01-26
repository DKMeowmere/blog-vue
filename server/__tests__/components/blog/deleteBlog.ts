import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { User } from "../../../src/models/user"
import { createToken } from "../../../src/utils/createToken"
import { doFileExists } from "../../../src/utils/files/doFileExists"
import { generateUser } from "../../fixtures/generateUser"
import { generateBlog } from "../../fixtures/generateBlog"
import { ImageElementType } from "../../../types/blog/image"

export async function deleteBlog(app: Express) {
	const user = generateUser()
	const { name, email, biography, password } = user
	const { title, content } = generateBlog(["TEXT"])
	const imageElement: ImageElementType = {
		_id: crypto.randomUUID(),
		type: "IMAGE",
		alt: "Alternate text",
		fileLocation: "test.jpg",
	}
	let blogId = ""
	let token = ""

	beforeEach(async () => {
		const { body } = await request(app)
			.post("/api/user")
			.set("content-type", "multipart/form-data")
			.field("name", name)
			.field("email", email)
			.field("biography", biography)
			.field("password", password)
			.attach("file", "__tests__/fixtures/files/test.jpg")
		token = `Bearer ${body.token}`

		const { body: blog } = await request(app)
			.post("/api/blog")
			.set("content-type", "multipart/form-data")
			.set("Authorization", token)
			.field("title", title)
			.field("content", JSON.stringify([...content, imageElement]))
			.field("mainFileLocation", "test.png")
			.attach("files", "__tests__/fixtures/files/test.png")
			.attach("files", "__tests__/fixtures/files/test.jpg")
		blogId = blog._id
	})

	describe("given the id of non existing blog", () => {
		it("should return 404", async () => {
			const { statusCode } = await request(app)
				.delete("/api/blog/non-existing-id")
				.set("Authorization", token)

			expect(statusCode).toBe(404)
		})
	})
	describe("given the id without token", () => {
		it("should return 401", async () => {
			const { statusCode } = await request(app).delete(`/api/blog/${blogId}`)

			expect(statusCode).toBe(401)
		})
	})
	describe("given the id with another user's token", () => {
		it("should return 403", async () => {
			const userPayload2 = generateUser()
			await User.create(userPayload2)
			const token2 = `Bearer ${createToken(userPayload2)}`

			const { statusCode } = await request(app)
				.delete(`/api/blog/${blogId}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token2)

			expect(statusCode).toBe(403)
		})
	})
	describe("given the id", () => {
		it("should return 200 and user", async () => {
			const { statusCode, body: blog } = await request(app)
				.delete(`/api/blog/${blogId}`)
				.set("Authorization", token)

			expect(statusCode).toBe(200)
			expect(blog).toBeDefined()

			const isFileSaved = await doFileExists(`.${blog.mainFileLocation}`)
			const isFileSaved2 = await doFileExists(`.${blog.content[1].fileLocation}`)
			expect(isFileSaved).toBe(false)
			expect(isFileSaved2).toBe(false)
		})
	})
}
