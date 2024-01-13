import { z } from "zod"
import { textSchema } from "./text"

export const listElementSchema = z.object({
	title: z.string(),
	type: z.literal("LIST"),
	listContent: z.array(textSchema),
})

export type ListElementType = z.infer<typeof listElementSchema>