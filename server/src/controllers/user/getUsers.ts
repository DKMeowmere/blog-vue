import { Response } from "express"
import { CustomRequest } from "../../../types/customRequest"
import { User } from "../../models/user"
import { handleControllerError } from "../../utils/handleControllerError"

export async function getUsers(req: CustomRequest, res: Response) {
	try {
		const { limit } = req.query
		const users = await User.find()
			.sort({ createdAt: -1 })
			.limit(parseInt(limit?.toString() || "0"))

		users.forEach(user => {
			user.password = ""
		})

		res.json(users)
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
