import { z } from "zod"

export const elementSchema = z.object({
	_id: z.string().default(crypto.randomUUID()),
	type: z.string(),
})

export type ElementType = z.infer<typeof elementSchema>
