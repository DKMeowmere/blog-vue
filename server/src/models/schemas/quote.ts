import mongoose from "mongoose"
import { QuoteElementType } from "../../../types/blog/quote"

export const quoteElementSchema = new mongoose.Schema<QuoteElementType>({
	type: "QUOTE",
	_id: {
		type: String,
		default: crypto.randomUUID(),
	},
	body: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		required: true,
		trim: true,
	},
})
