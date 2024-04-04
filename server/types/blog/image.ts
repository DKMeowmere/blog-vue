import { z } from "zod"

export const imageElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	type: z.literal("IMAGE"),
	fileLocation: z.string().default("/static/defaultBlog.jpg"),
	alt: z.string(),
})

export type ImageElementType = z.infer<typeof imageElementSchema>
