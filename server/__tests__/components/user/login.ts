import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { userSchema } from "../../../types/user"
import { getUser } from "../../fixtures/getUser"

export function login(app: Express) {
	const { email, name, biography, password } = getUser()

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

	describe("given the payload without email", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user/login")
				.send({ password })

			expect(statusCode).toBe(400)
		})
	})

	describe("given the payload without password", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user/login")
				.send({ email })

			expect(statusCode).toBe(400)
		})
	})

	describe("given the email of non-existing account", () => {
		it("should return 404", async () => {
			const { statusCode } = await request(app)
				.post("/api/user/login")
				.send({ email: "non-existing@email.com", password })

			expect(statusCode).toBe(404)
		})
	})

	describe("given the email and password then token", () => {
		it("should return double 200", async () => {
			const { statusCode, body } = await request(app)
				.post("/api/user/login")
				.send({ email, password })
			const { user, token } = body
			const { success } = userSchema.safeParse(user)

			expect(statusCode).toBe(200)
			expect(token).toBeDefined()
			expect(success).toBeTruthy()

			const { statusCode: statusCodeWithToken } = await request(app)
				.post("/api/user/login")
				.set("Authorization", `Bearer ${token}`)

			expect(statusCodeWithToken).toBe(200)
		})
	})
}
