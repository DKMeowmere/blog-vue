import { NextFunction, Response } from "express"
import multer, { memoryStorage } from "multer"
import path from "path"
import { CustomError } from "../../types/customError"
import { UploadOptions } from "../../types/uploadOptions"
import { CustomRequest } from "../../types/customRequest"
import { FILE_UPLOAD_ERROR } from "../config/constants/universalErrors"
import { handleControllerError } from "../utils/handleControllerError"

export async function uploadFile(
	req: CustomRequest,
	res: Response,
	next: NextFunction,
	{
		type = "SINGLE",
		allowedFileExtensions = [".jpg", ".jpeg", ".png"],
		fileSize = 1024 * 1024 * 1024 * 5,
	}: UploadOptions = {}
) {
	try {
		const storage = memoryStorage()
		const upload = multer({
			storage,
			limits: { fileSize },
			fileFilter(req, file, cb) {
				if (!file) {
					cb(null, false)
					return
				}
        
				const fileExtension = path.extname(file.originalname)

				if (allowedFileExtensions.includes(fileExtension)) {
					cb(null, true)
					return
				}

				cb(null, false)
			},
		})
		const uploadWithType =
			type === "SINGLE" ? upload.single("file") : upload.array("files")
      
		uploadWithType(req, res, err => {
			if (err) {
				console.log(err)
				handleControllerError(res, new CustomError(FILE_UPLOAD_ERROR))
			} else {
				next()
			}
		})
	} catch (err: unknown) {
		handleControllerError(res, err)
	}
}
