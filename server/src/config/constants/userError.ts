import { CustomErrorType } from "../../../types/customError"

export const USER_NOT_FOUND: CustomErrorType = {
	message: "nie znaleziono użytkownika",
	statusCode: 404,
}

export const USER_IN_TOKEN_NOT_FOUND: CustomErrorType = {
	message: "Użytkownik podany w tokenie, nie istnieje",
	statusCode: 404,
}

export const AUTH_NEEDED: CustomErrorType = {
	message: "Musisz być zalogowany, żeby to zrobić",
	statusCode: 401,
}

export const INVALID_USER_ID: CustomErrorType = {
	message: "Niepoprawne id użytkownika",
	statusCode: 400,
}

export const USER_UPDATE_FORBIDDEN: CustomErrorType = {
	message: "Możesz zaaktualizować tylko swój profil",
	statusCode: 403,
}

export const NO_USERS: CustomErrorType = {
	message: "Nie znaleziono żadnego użytkownika",
	statusCode: 404,
}

export const LOGIN_FAILED: CustomErrorType = {
	message: "Logowanie nie powiodło się",
	statusCode: 400,
}

export const ACCOUNT_CREATION_FAILED: CustomErrorType = {
	message: "Utworzenie konta nie powiodło się",
	statusCode: 400,
}

export const MAX_NAME_LENGTH_EXCEEDED: CustomErrorType = {
	message: "Maksymalna długość nazwy użytkownika to 20 znaków",
	statusCode: 400,
}

