import request from "supertest"
import { Express } from "express"
import { expect, describe, it } from "vitest"
import { userSchema } from "../../../types/user"
import { generateUser } from "../../fixtures/generateUser"

export async function createUser(app: Express) {
	const userPayload = generateUser()
	describe("given the user payload and file with invalid extension", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("name", userPayload.name)
				.field("email", userPayload.email)
				.field("biography", userPayload.biography)
				.field("password", userPayload.password)
				.attach("file", "__tests__/fixtures/files/note.txt")

			expect(statusCode).toBe(400)
		})
	})
	describe("given the user payload without name", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("email", userPayload.email)
				.field("biography", userPayload.biography)
				.field("password", userPayload.password)
				.attach("file", "__tests__/fixtures/files/test.jpg")

			expect(statusCode).toBe(400)
		})
	})
	describe("given the user payload without email", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("name", userPayload.name)
				.field("biography", userPayload.biography)
				.field("password", userPayload.password)
				.attach("file", "__tests__/fixtures/files/test.jpg")

			expect(statusCode).toBe(400)
		})
	})
	describe("given the user payload without password", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("name", userPayload.name)
				.field("email", userPayload.email)
				.field("biography", userPayload.biography)
				.attach("file", "__tests__/fixtures/files/test.jpg")

			expect(statusCode).toBe(400)
		})
	})
	describe("given the user payload", () => {
		it("should return 201, user payload and token", async () => {
			const { body, statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("name", userPayload.name)
				.field("email", userPayload.email)
				.field("biography", userPayload.biography)
				.field("password", userPayload.password)
				.attach("file", "__tests__/fixtures/files/test.jpg")

			const { success } = userSchema.safeParse(body.user)

			expect(statusCode).toBe(201)
			expect(success).toBeTruthy()
			expect(body.token).toBeDefined()
			expect(body.user.fileLocation).toBeDefined()
			expect(body.user.password).toBe("")
      //expect file to exist
		})
	})
	describe("given the user payload with too short password", () => {
		it("should return 400 because 8 chars is min for password", async () => {
			const { statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("name", userPayload.name)
				.field("email", userPayload.email)
				.field("biography", userPayload.biography)
				.field("password", "short")
				.attach("file", "__tests__/fixtures/files/test.jpg")

			expect(statusCode).toBe(400)
		})
	})
	describe("given the user payload without file", () => {
		it("should return 400", async () => {
			const { statusCode } = await request(app)
				.post("/api/user")
				.set("content-type", "multipart/form-data")
				.field("name", userPayload.name)
				.field("email", userPayload.email)
				.field("biography", userPayload.biography)

			expect(statusCode).toBe(400)
		})
	})
}
