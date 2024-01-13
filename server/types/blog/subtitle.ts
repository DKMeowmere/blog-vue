import { z } from "zod"

export const subtitleElementSchema = z.object({
	content: z.string(),
	type: z.literal("SUBTITLE"),
})

export type SubtitleElementType = z.infer<typeof subtitleElementSchema>