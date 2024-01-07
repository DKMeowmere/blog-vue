import { z } from "zod"

export const userSchema = z.object({
	_id: z.string(),
	name: z
		.string()
		.max(20, { message: "maksymalna długość nazwy to 20 znaków" }),
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
