import { Router } from "express"
import { createUser } from "../controllers/user/createUser"
import { login } from "../controllers/user/login"
import { getUsers } from "../controllers/user/getUsers"
import { getUser } from "../controllers/user/getUser"
import { updateUser } from "../controllers/user/updateUser"
import { deleteUser } from "../controllers/user/deleteUser"
import { requireAuth } from "../middlewares/auth"
import { uploadFile } from "../middlewares/uploadFile"

export const userRouter = Router()

userRouter.route("/").get(getUsers).post(uploadFile, createUser)
userRouter
	.route("/:id")
	.get(getUser)
	.get(getUser)
	.patch(requireAuth, uploadFile, updateUser)
	.delete(requireAuth, deleteUser)
userRouter.route("/login").post(login)
