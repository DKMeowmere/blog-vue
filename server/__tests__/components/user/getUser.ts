import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { userSchema } from "../../../types/user"
import { User } from "../../../src/models/user"
import { Blog } from "../../../src/models/blog"
import { generateUser } from "../../fixtures/generateUser"
import { generateBlog } from "../../fixtures/generateBlog"

export async function getUser(app: Express) {
	const userPayload = generateUser()
	const { _id } = userPayload

	beforeEach(async () => {
		const blog = generateBlog(["TEXT"])
		await Blog.create({ ...blog, author: _id })
		await User.create({ ...userPayload, userBlogs: [blog._id] })
	})

	describe("given the user id", () => {
		it("should return 200 and user with blogs", async () => {
			const { statusCode, body: user } = await request(app).get(
				`/api/user/${_id}`
			)
			const { success } = userSchema.safeParse(user)

			expect(success).toBeTruthy()
			expect(statusCode).toBe(200)
			expect(user.password).toBe("")
			expect(user.userBlogs[0]._id).toBeDefined()
		})
	})
	describe("given the id of non existing user", () => {
		it("should return 404", async () => {
			const id = "404"
			const { statusCode } = await request(app).get(`/api/user/${id}`)
			expect(statusCode).toBe(404)
		})
	})
}
