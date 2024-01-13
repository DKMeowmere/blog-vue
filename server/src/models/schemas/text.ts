import mongoose from "mongoose"
import { TextElementType } from "../../../types/blog/text"

export const textElementSchema = new mongoose.Schema<TextElementType>({
	type: "TEXT",
	content: {
		type: String,
		required: true,
		trim: true,
	},
	to: { type: String, required: true, trim: true },
	textType: {
		required: true,
		type: String,
	},
})
