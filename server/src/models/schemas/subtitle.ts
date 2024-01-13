import mongoose from "mongoose"
import { SubtitleElementType } from "../../../types/blog/subtitle"

export const subtitleElementSchema = new mongoose.Schema<SubtitleElementType>({
	type: "SUBTITLE",
	content: {
		type: String,
		required: true,
		trim: true,
	},
})
