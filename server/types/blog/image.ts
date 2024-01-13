import { z } from "zod"

export const imageElementSchema = z.object({
	type: z.literal("IMAGE"),
	fileLocation: z.string(),
	alt: z.string(),
})

export type ImageElementType = z.infer<typeof imageElementSchema>