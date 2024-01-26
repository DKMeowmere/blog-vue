import { CustomErrorType } from "../../../types/customError"

export const UNIVERSAL_ERROR: CustomErrorType = {
	message: "Nieoczekiwany błąd",
	statusCode: 400,
}

export const ACCESS_DENIED: CustomErrorType = {
	message: "Nie przyznano dostępu do zasobu",
	statusCode: 403,
}

export const FILE_MISSING: CustomErrorType = {
	message: "Brak pliku",
	statusCode: 400,
}

export const FILE_UPLOAD_ERROR: CustomErrorType = {
	message: "Niepoprawny plik lub jego brak",
	statusCode: 400,
}

export const FILES_UPLOAD_ERROR: CustomErrorType = {
	message: "Niepoprawny pliki lub ich brak",
	statusCode: 400,
}

export const FILES_VALIDATION_FAILED_MUST_BE_IMAGE_OR_AUDIO: CustomErrorType = {
	message:
		"Plik nie może zawierać '/' oraz musi posiadać rozszerzenie .jpg  .jpeg, .png lub .mp3",
	statusCode: 400,
}

export const FILES_VALIDATION_FAILED_MUST_BE_IMAGE: CustomErrorType = {
	message:
		"Plik nie może zawierać '/' oraz musi posiadać rozszerzenie .jpg  .jpeg lub .png",
	statusCode: 400,
}

export const ID_MISSING: CustomErrorType = {
	message: "Brak id zasobu",
	statusCode: 400,
}

export const INVALID_OBJECT_ID: CustomErrorType = {
	message: "Niepoprawne id",
	statusCode: 400,
}

export const INVALID_FILE_NAME: CustomErrorType = {
	message: "Zła nazwa pliku",
	statusCode: 400,
}
