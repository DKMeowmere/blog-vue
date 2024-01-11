import request from "supertest"
import { Express } from "express"
import { beforeEach, it, describe, expect } from "vitest"
import { userSchema } from "../../../types/user"
import { generateUser } from "../../fixtures/generateUser"
import { User } from "../../../src/models/user"
import { createToken } from "../../../src/utils/createToken"

export async function updateUser(app: Express) {
	const userPayload = generateUser()
	const { _id, name, biography } = userPayload
	const token = `Bearer ${createToken(userPayload)}`

	beforeEach(async () => {
		await User.create(userPayload)
	})

	describe("given the id of non existing user", () => {
		it("should return 404", async () => {
			const { statusCode } = await request(app)
				.patch("/api/user/non-existing-id")
				.set("Authorization", token)
				.set("content-type", "multipart/form-data")
				.field("name", name)
				.field("biography", biography)

			expect(statusCode).toBe(404)
		})
	})
	describe("given the user payload without token", () => {
		it("should return 401", async () => {
			const { statusCode } = await request(app)
				.patch(`/api/user/${_id}`)
				.set("content-type", "multipart/form-data")
				.field("name", name)
				.field("biography", biography)

			expect(statusCode).toBe(401)
		})
	})
	describe("given the user with another user's token", () => {
		it("should return 403", async () => {
			const userPayload2 = generateUser()
			await User.create(userPayload2)
			const token2 = `Bearer ${createToken(userPayload2)}`

			const { statusCode } = await request(app)
				.patch(`/api/user/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token2)
				.field("name", userPayload.name)
				.field("biography", userPayload.biography)

			expect(statusCode).toBe(403)
		})
	})
	describe("given the user payload", () => {
		it("should return 200 and user", async () => {
			const { statusCode, body: user } = await request(app)
				.patch(`/api/user/${_id}`)
				.set("content-type", "multipart/form-data")
				.set("Authorization", token)
				.field("name", "UPDATED NAME")
				.field("biography", "UPDATED BIOGRAPHY")
				.attach("file", "__tests__/fixtures/files/test.jpg")

			const { success } = userSchema.safeParse(user)

			expect(statusCode).toBe(200)
			expect(success).toBeTruthy()
			expect(user.password).toBe("")
			expect(user.name).toBe("UPDATED NAME")
			expect(user.biography).toBe("UPDATED BIOGRAPHY")
			//test blogs
			const fileRes = await request(app).get(user.fileLocation)
			expect(fileRes.status).toBe(200)
		})
	})
}
