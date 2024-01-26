import { z } from "zod"
import { textElementSchema } from "./text"
import { imageElementSchema } from "./image"
import { subtitleElementSchema } from "./subtitle"
import { listElementSchema } from "./list"
import { quoteElementSchema } from "./quote"
import {
	BLOG_CONTENT_MUST_NOT_BE_EMPTY,
	MAX_BLOG_TITLE_LENGTH_EXCEEDED,
} from "../../src/config/constants/blogError"

export type BlogElementTypes = "TEXT" | "IMAGE" | "LIST" | "SUBTITLE" | "QUOTE"

const blogElementSchema = z.discriminatedUnion("type", [
	textElementSchema,
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
	likes: z.number().catch(0),
	createdAt: z.string().or(z.date()).optional(),
	updatedAt: z.string().or(z.date()).optional(),
})

export const blogValidationSchema = blogSchema.extend({
	title: z
		.string()
		.max(20, { message: MAX_BLOG_TITLE_LENGTH_EXCEEDED.message }),
	content: z
		.array(blogElementSchema)
		.min(1, { message: BLOG_CONTENT_MUST_NOT_BE_EMPTY.message }),
})

export type BlogElement = z.infer<typeof blogElementSchema>
export type BlogType = z.infer<typeof blogSchema>
