import { z } from "zod"
import { textElementSchema } from "./text"

export const listElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	type: z.literal("LIST"),
	title: z.string().default(""),
	listContent: z.array(textElementSchema),
})

export type ListElementType = z.infer<typeof listElementSchema>
