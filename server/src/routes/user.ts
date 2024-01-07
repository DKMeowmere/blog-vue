import { Router } from "express"
import path from "path"
import multer, { memoryStorage } from "multer"
import { createUser } from "../controllers/user/createUser"
import { login } from "../controllers/user/login"

export const userRouter = Router()

const storage = memoryStorage()
const upload = multer({
	storage,
	limits: { fileSize: 1024 * 1024 * 1024 * 5 },
	fileFilter(req, file, cb) {
		if (!file) {
			cb(null, false)
			return
		}

		const allowedFileExtensions = [".jpg", ".jpeg", ".png"]
		const fileExtension = path.extname(file.originalname)

		if (allowedFileExtensions.includes(fileExtension)) {
			cb(null, true)
			return
		}

		cb(null, false)
	},
})

userRouter.route("/").post(upload.single("file"), createUser)
userRouter.route("/login").post(login)
