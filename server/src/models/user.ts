import mongoose from "mongoose"
import { UserType } from "../../types/user"

const userSchema = new mongoose.Schema<UserType>(
	{
		_id: String,
		name: {
			type: String,
			required: true,
			trim: true,
		},
		biography: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: { type: String, required: true, trim: true },
		fileLocation: { type: String, required: true, trim: true },
		userBlogs: { type: [], default: [] },
	},
	{ timestamps: true }
)

export const User = mongoose.model("User", userSchema)
