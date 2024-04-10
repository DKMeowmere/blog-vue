import mongoose from "mongoose"
import { TextElementType } from "../../../types/blog/text"

export const textElementSchema = new mongoose.Schema<TextElementType>({
	_id: {
		type: String,
		default: crypto.randomUUID(),
	},
	type: "TEXT",
	body: {
		type: String,
		required: true,
		trim: true,
	},
})
