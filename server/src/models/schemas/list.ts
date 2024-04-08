import mongoose from "mongoose"
import { ListElementType } from "../../../types/blog/list"
import { textElementSchema } from "./text"

export const listElementSchema = new mongoose.Schema<ListElementType>({
	_id: {
		type: String,
		default: crypto.randomUUID(),
	},
	type: "LIST",
	title: {
		type: String,
		required: true,
		default: "",
	},
	listContent: {
		type: [textElementSchema],
		required: true,
	},
})
