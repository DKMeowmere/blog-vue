import { z } from "zod"

export const quoteElementSchema = z.object({
	content: z.string(),
	type: z.literal("QUOTE"),
	author: z.string(),
})

export type QuoteElementType = z.infer<typeof quoteElementSchema>