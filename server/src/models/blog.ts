import mongoose, { Schema } from "mongoose"
import { BlogType } from "../../types/blog/blog"

export const blogSchema = new mongoose.Schema<BlogType>(
	{
		_id: {
			type: String,
			required: true,
			default: crypto.randomUUID(),
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: String,
			ref: "User",
		},
		mainFileLocation: {
			type: String,
			trim: true,
		},
		source: {
			type: String,
			default: "",
		},
		tags: {
			type: [String],
		},
		likes: { type: Number, default: 0 },
		content: {
			required: true,
			type: Schema.Types.Mixed,
			default: [],
		},
	},
	{ timestamps: true }
)

export const Blog = mongoose.model<BlogType>("Blog", blogSchema)
