import { z } from "zod"

export const textElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	body: z.string(),
	type: z.literal("TEXT"),
})
export const textSchema = z.array(textElementSchema)

export type TextElementType = z.infer<typeof textElementSchema>
