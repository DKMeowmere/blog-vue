import { z } from "zod"
import { MAX_NAME_LENGTH_EXCEEDED } from "../src/config/constants/userError"

export const userSchema = z.object({
	_id: z.string(),
	name: z.string().max(20, { message: MAX_NAME_LENGTH_EXCEEDED.message }),
	email: z.string().email({ message: "Nie prawidłowy email" }),
	password: z.string(),
	biography: z.string().default("").catch(""),
	userBlogs: z.array(z.string()).catch([]),
	fileLocation: z.string().nullable().catch(null),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
})

export const userSchemaPostValidation = userSchema.extend({
	id: z.undefined(),
	password: z
		.string()
		.min(8, { message: "Minimalna długość hasła to 8 znaków" }),
})

export type UserType = z.infer<typeof userSchema>
