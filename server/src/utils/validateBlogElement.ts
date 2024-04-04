import { BlogElement } from "../../types/blog/blog"
import { textElementSchema } from "../../types/blog/text"
import { imageElementSchema } from "../../types/blog/image"
import { listElementSchema } from "../../types/blog/list"
import { quoteElementSchema } from "../../types/blog/quote"
import { subtitleElementSchema } from "../../types/blog/subtitle"
import { UNIVERSAL_ERROR } from "../config/constants/universalErrors"
import { getZodErrorMessage } from "./getZodErrorMessage"
import { CustomError } from "../../types/customError"

export function validateElement(element: BlogElement) {
	if (element.type === "TEXT") {
		const result = textElementSchema.safeParse(element)

		if (!result.success) {
			return new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}
	} else if (element.type === "IMAGE") {
		const result = imageElementSchema.safeParse(element)

		if (!result.success) {
			return new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}

		const newElement = result.data
		element.fileLocation = newElement.fileLocation
	} else if (element.type === "LIST") {
		const result = listElementSchema.safeParse(element)

		if (!result.success) {
			return new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}
	} else if (element.type === "QUOTE") {
		const result = quoteElementSchema.safeParse(element)

		if (!result.success) {
			return new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}
	} else if (element.type === "SUBTITLE") {
		const result = subtitleElementSchema.safeParse(element)

		if (!result.success) {
			return new CustomError({
				message: getZodErrorMessage(result.error.message),
				statusCode: 400,
			})
		}
	} else {
		return UNIVERSAL_ERROR
	}
}
