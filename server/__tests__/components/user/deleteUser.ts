import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { User } from "../../../src/models/user"
import { createToken } from "../../../src/utils/createToken"
import { generateUser } from "../../fixtures/generateUser"

export async function deleteUser(app: Express) {
	const userPayload = generateUser()
	const { _id, name, email, biography, password } = userPayload
	const token = createToken(userPayload)

	beforeEach(async () => {
		await request(app)
			.post("/api/user")
			.set("content-type", "multipart/form-data")
			.field("name", name)
			.field("email", email)
			.field("biography", biography)
			.field("password", password)
			.attach("file", "__tests__/fixtures/files/test.jpg")
	})

	describe("given the id of non existing user", () => {
		it("should return 404", async () => {
			const { statusCode } = await request(app)
				.delete("/api/user/non-existing-id")
				.set("Authorization", token)

			expect(statusCode).toBe(404)
		})
	})
	describe("given the id payload without token", () => {
		it("should return 401", async () => {
			const { statusCode } = await request(app).delete(`/api/user/${_id}`)

			expect(statusCode).toBe(401)
		})
	})
	describe("given the id with another user's token", () => {
		it("should return 403", async () => {
			const userPayload2 = generateUser()
			await User.create(userPayload2)
			const token2 = `Bearer ${createToken(userPayload2)}`

			const { statusCode } = await request(app)
				.delete(`/api/user/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token2)

			expect(statusCode).toBe(403)
		})
	})
	describe("given the user payload", () => {
		it("should return 200 and user", async () => {
			const { statusCode, body: user } = await request(app)
				.delete(`/api/user/${_id}`)
				.set("Authorization", token)

			expect(statusCode).toBe(200)
			expect(user).toBeDefined()
			const fileRes = await request(app).get(user.fileLocation)
			expect(fileRes.status).toBe(404)
		})
	})
}
