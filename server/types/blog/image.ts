import { z } from "zod"

export const imageElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	type: z.literal("IMAGE"),
	fileLocation: z.string(),
	alt: z.string(),
})

export type ImageElementType = z.infer<typeof imageElementSchema>
