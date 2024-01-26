import { z } from "zod"

export const quoteElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	body: z.string(),
	type: z.literal("QUOTE"),
	author: z.string(),
})

export type QuoteElementType = z.infer<typeof quoteElementSchema>
