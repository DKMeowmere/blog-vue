import mongoose from "mongoose"
import { ImageElementType } from "../../../types/blog/image"

export const imageElementSchema = new mongoose.Schema<ImageElementType>({
	_id: {
		type: String,
		default: crypto.randomUUID(),
	},
	type: "IMAGE",
	alt: {
		type: String,
		required: true,
		trim: true,
	},
	fileLocation: {
		type: String,
		required: true,
		trim: true,
	},
})
