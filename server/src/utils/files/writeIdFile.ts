import path from "path"
import fs from "fs/promises"
import { CustomError } from "../../../types/customError"
import { FILE_MISSING } from "../../config/constants/universalErrors"
import { FILE_UPLOAD_PATH } from "../../config/envVariables"

export async function writeIdFile(id: string, file?: Express.Multer.File) {
	if (!file) {
		throw new CustomError(FILE_MISSING)
	}

	const ext = path.extname(file.originalname)
	const fileName = `${id}${ext}`
	const filePath = `${FILE_UPLOAD_PATH}/${fileName}`
	const absolutePath = path.resolve(`.${filePath}`)

	await fs.writeFile(absolutePath, file.buffer)

	return filePath
}
