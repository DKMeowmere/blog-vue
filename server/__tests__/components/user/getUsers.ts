import request from "supertest"
import { Express } from "express"
import { expect, describe, it, beforeEach } from "vitest"
import { User } from "../../../src/models/user"
import { generateUser } from "../../fixtures/generateUser"

export async function getUsers(app: Express) {
	beforeEach(async () => {
		await User.create(generateUser())
		await User.create(generateUser())
		await User.create(generateUser())
	})
	describe("given the 3 documents", () => {
		it("should return 200 and 3 users", async () => {
			const { statusCode, body } = await request(app).get("/api/user")
 
			expect(statusCode).toBe(200)
			expect(body).toHaveLength(3)
			expect(body[0].password).toBe("")
		})
	})
	describe("given the 3 documents with limit 2", () => {
		it("should return 200 and 2 users", async () => {
			const { statusCode, body } = await request(app).get("/api/user?limit=2")
			expect(statusCode).toBe(200)
			expect(body).toHaveLength(2)
		})
	})
}
