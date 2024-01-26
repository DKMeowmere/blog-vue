import express from "express"
import cors from "cors"
import morgan from "morgan"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import {
	CLIENT_APP_URL,
	FILE_UPLOAD_PATH,
	NODE_ENV,
} from "../config/envVariables"
import { User } from "../models/user"
import { Blog } from "../models/blog"
import { userRouter } from "../routes/user"
import { resetServer } from "./resetServer"
import { writeLogsToFile } from "./writeLogsToFile"
import { blogRouter } from "../routes/blog"

type Options = {
	saveLogs?: boolean
	logsFileName?: string
}

export function createServer(options: Options = {}) {
	const app = express()
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = dirname(__filename)

	const { saveLogs, logsFileName } = options

	if (saveLogs) {
		writeLogsToFile(logsFileName || "default")
	}

	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	app.use(
		cors({
			methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"],
			allowedHeaders: ["Content-Type", "Authorization"],
			origin: [CLIENT_APP_URL],
		})
	)

	NODE_ENV !== "TEST" && app.use(morgan("dev"))

	app.use("/healthcheck", (req, res) =>
		res.json({ message: "App is up and running" })
	)

	NODE_ENV === "TEST" &&
		app.use("/api/reset", async (req, res) => {
			await resetServer()

			res.status(200).json({ message: "Server reseted" })
		})

	User.createCollection()
	Blog.createCollection()
	app.use("/api/user", userRouter)
	app.use("/api/blog", blogRouter)

	const absoluteUploadPath = path.resolve(`.${FILE_UPLOAD_PATH}`)
	app.use("/static/uploads", express.static(absoluteUploadPath))
	NODE_ENV === "TEST" &&
		app.use("/static/.test-env-uploads", express.static(absoluteUploadPath))
	app.use("/static", express.static(path.join(__dirname, "../../static")))

	app.use((req, res) => {
		if (NODE_ENV === "PRODUCTION") {
			res.status(200).sendFile(path.join(__dirname, "../../index.html"))
		} else {
			res.redirect(CLIENT_APP_URL)
		}
	})

	return app
}
