import { z } from "zod"
import {
	INVALID_EMAIL,
	MAX_NAME_LENGTH_EXCEEDED,
	PASSWORD_TOO_SHORT,
} from "../src/config/constants/userError"
import { blogSchema } from "./blog/blog"

export const userSchema = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	biography: z.string().default("").catch(""),
	userBlogs: z.array(z.string().or(blogSchema)).catch([]),
	fileLocation: z.string().nullable().catch(null),
	createdAt: z.string().or(z.date()).optional(),
	updatedAt: z.string().or(z.date()).optional(),
})

export const userSchemaCopy = { ...userSchema }

export const userValidationSchema = userSchema.extend({
	name: z.string().max(20, { message: MAX_NAME_LENGTH_EXCEEDED.message }),
	email: z.string().email({ message: INVALID_EMAIL.message }),
	password: z.string().min(8, { message: PASSWORD_TOO_SHORT.message }),
	biography: z.string().default("").catch(""),
})

export type UserType = z.infer<typeof userSchema>
