import mongoose from "mongoose"
import { UserType } from "../../types/user"

const userSchema = new mongoose.Schema<UserType>(
	{
		_id: {
			type: String,
			required: true,
			default: crypto.randomUUID(),
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		biography: {
			type: String,
			default: "",
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: { type: String, required: true, trim: true, unique: true },
		fileLocation: { type: String, required: true, trim: true },
		userBlogs: [{ type: String, ref: "Blog", default: [] }],
	},
	{ timestamps: true }
)

export const User = mongoose.model<UserType>("User", userSchema)
