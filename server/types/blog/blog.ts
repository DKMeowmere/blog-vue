import { z } from "zod"
import { textSchema } from "./text"
import { imageElementSchema } from "./image"
import { subtitleElementSchema } from "./subtitle"
import { listElementSchema } from "./list"
import { quoteElementSchema } from "./quote"

const blogElementSchema = z.union([
	textSchema,
	imageElementSchema,
	subtitleElementSchema,
	listElementSchema,
	quoteElementSchema,
])

export const blogSchema = z.object({
	_id: z.string(),
	title: z.string(),
	author: z.string(),
	mainFileLocation: z.string(),
	content: z.array(blogElementSchema),
	source: z.string().catch(""),
	tags: z.array(z.string()).catch([]),
	likes: z.number(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
})

export const blogSchemaPostValidation = blogSchema.extend({
	title: z.string().max(20),
	content: z.array(blogElementSchema).min(1),
})

export type BlogType = z.infer<typeof blogSchema>
