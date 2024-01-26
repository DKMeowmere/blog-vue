import { BlogElement, BlogElementTypes, BlogType } from "../../types/blog/blog"
import { ImageElementType } from "../../types/blog/image"
import { SubtitleElementType } from "../../types/blog/subtitle"
import { TextElementType } from "../../types/blog/text"
import { QuoteElementType } from "../../types/blog/quote"
import { ListElementType } from "../../types/blog/list"
import { Blog } from "../../src/models/blog"

export const textElement: TextElementType = {
	_id: crypto.randomUUID(),
	type: "TEXT",
	body: "Text content",
	textType: "DEFAULT",
	to: "",
}

export const imageElement: ImageElementType = {
	_id: crypto.randomUUID(),
	type: "IMAGE",
	alt: "Alternate text",
	fileLocation: "",
}

export const subtitleElement: SubtitleElementType = {
	_id: crypto.randomUUID(),
	type: "SUBTITLE",
	body: "Subtitle",
}

export const quoteElement: QuoteElementType = {
	_id: crypto.randomUUID(),
	type: "QUOTE",
	author: "Quote Author",
	body: "Quote body",
}

export const listElement: ListElementType = {
	_id: crypto.randomUUID(),
	type: "LIST",
	listContent: [{ ...textElement }],
}

export function generateBlog(
	elementTypes: BlogElementTypes[]
): Omit<BlogType, "createdAt" | "updatedAt"> {
	const content: BlogElement[] = []
	const elementsSet = new Set(elementTypes)

	elementsSet.has("TEXT") && content.push(textElement)
	elementsSet.has("IMAGE") && content.push(imageElement)
	elementsSet.has("SUBTITLE") && content.push(subtitleElement)
	elementsSet.has("QUOTE") && content.push(quoteElement)
	elementsSet.has("LIST") && content.push(listElement)

	return {
		_id: crypto.randomUUID(),
		title: "Blog title",
		author: "",
		content,
		likes: 0,
		mainFileLocation: "",
		source: "",
		tags: [],
	}
}

export async function saveBlog(blog: BlogType) {
	await Blog.create(blog)
}
