import { CustomErrorType } from "../../../types/customError"

export const BLOG_NOT_FOUND: CustomErrorType = {
	message: "Nie znaleziono bloga",
	statusCode: 404,
}

export const ELEMENT_NOT_FOUND: CustomErrorType = {
	message: "Nie znaleziono elementu",
	statusCode: 404,
}

export const MAX_BLOG_TITLE_LENGTH_EXCEEDED: CustomErrorType = {
	message: "Maksymalna długość nazwy użytkownika to 20 znaków",
	statusCode: 400,
}

export const BLOG_CONTENT_MUST_NOT_BE_EMPTY: CustomErrorType = {
	message: "Blog musi posiadać przynajmniej jeden element",
	statusCode: 400,
}

export const MAIN_BLOG_FILE_MISSING: CustomErrorType = {
	message: "Maksymalna długość nazwy użytkownika to 20 znaków",
	statusCode: 400,
}
