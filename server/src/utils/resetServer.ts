import fs from "fs/promises"
import { FILE_UPLOAD_PATH } from "../config/envVariables"
import { User } from "../models/user"
import { Blog } from "../models/blog"
import { removeFile } from "./files/removeFile"

export async function resetServer() {
	await User.deleteMany({})
	await Blog.deleteMany({})

	const fileList = await fs.readdir(`.${FILE_UPLOAD_PATH}`)

	fileList.forEach(async file => {
		if (file === ".gitkeep") {
			return
		}
		await removeFile(`./${FILE_UPLOAD_PATH}/${file}`)
	})
}
