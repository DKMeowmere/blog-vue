import mongoose from "mongoose"
import { ListElementType } from "../../../types/blog/list"

export const listElementSchema = new mongoose.Schema<ListElementType>({
	type: "LIST",
	title: {
		type: String,
		required: true,
		trim: true,
	},
})
