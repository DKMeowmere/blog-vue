import mongoose from "mongoose"
import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import { describe, beforeAll, afterAll, beforeEach } from "vitest"
import { createServer } from "../src/utils/createServer"
import { createUser } from "./components/user/createUser"
import { login } from "./components/user/login"

export const app = createServer({ logsFileName: "user", saveLogs: true })

describe("USER /api/user", () => {
	beforeAll(async () => {
		const mongodb = await MongoMemoryServer.create()
		const uri = mongodb.getUri()
		await mongoose.connect(uri)
	})
	beforeEach(async () => {
		await request(app).get("/api/reset")
	})
	afterAll(async () => {
		await request(app).get("/api/reset")

		await mongoose.disconnect()
		await mongoose.connection.close()
	})

	describe("POST / createUser", () => createUser(app))
	describe("POST /login login", () => login(app))
})
