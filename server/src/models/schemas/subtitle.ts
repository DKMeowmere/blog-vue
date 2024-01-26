import mongoose from "mongoose"
import { SubtitleElementType } from "../../../types/blog/subtitle"

export const subtitleElementSchema = new mongoose.Schema<SubtitleElementType>({
	_id: {
		type: String,
		default: crypto.randomUUID(),
	},
	type: "SUBTITLE",
	body: {
		type: String,
		required: true,
		trim: true,
	},
})
