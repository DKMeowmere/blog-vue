import { z } from "zod"

export const textTypes = [
	"DEFAULT",
	"BOLD",
	"LINEBREAK",
	"ITALIC",
	"UNDERLINED",
	"LINK",
] as const

export const textElementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	body: z.string(),
	type: z.literal("TEXT"),
	to: z.string().catch(""),
	textType: z.enum(textTypes),
})
export const textSchema = z.array(textElementSchema)

export type TextElementType = z.infer<typeof textElementSchema>
