import { z } from "zod"

export const subtitleElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	body: z.string(),
	type: z.literal("SUBTITLE"),
})

export type SubtitleElementType = z.infer<typeof subtitleElementSchema>
