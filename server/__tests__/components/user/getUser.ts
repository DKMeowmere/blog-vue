import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { userSchema } from "../../../types/user"
import { User } from "../../../src/models/user"
import { generateUser } from "../../fixtures/generateUser"

export async function getUser(app: Express) {
	const userPayload = generateUser()

	beforeEach(async () => {
		await User.create(userPayload)
	})

	describe("given the user id", () => {
		it("should return 200 and user with blogs", async () => {
			const { statusCode, body: user } = await request(app).get(
				`/api/user/${userPayload._id}`
			)
			const { success } = userSchema.safeParse(user)

			expect(success).toBeTruthy()
			expect(statusCode).toBe(200)
			expect(user.password).toBe("")
			//blogs
		})
	})
	describe("given the id of non existing user", () => {
		it("should return 404", async () => {
			const id = "644c34ccfa6d83e3476c4ecc"
			const { statusCode } = await request(app).get(`/api/user/${id}`)
			expect(statusCode).toBe(404)
		})
	})
}
