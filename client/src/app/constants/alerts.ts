import { Alert } from "@backend/types/client/alert"

type AlertWithoutId = Omit<Alert, "id">

export const LOGIN_SUCCESSFUL: AlertWithoutId = {
	body: "Zalogowano się pomyślnie",
	type: "SUCCESS",
}

export const ALREADY_LOGGED_IN: AlertWithoutId = {
	body: "Jesteś już zalogowany",
	type: "INFO",
}

export const LOGOUT_SUCCESSFUL: AlertWithoutId = {
	body: "Wylogowano się pomyślnie",
	type: "SUCCESS",
}

export const USER_UPDATE_SUCCESSFUL: AlertWithoutId = {
	body: "Zaaktualizowano konto pomyślnie",
	type: "SUCCESS",
}

export const ONLY_SELF_ACCOUNT_UPDATE_IS_ALLOWED: AlertWithoutId = {
	body: "Możesz edytować tylko swoje konto",
	type: "WARNING",
}

export const USER_DELETION_SUCCESSFUL: AlertWithoutId = {
	body: "Usunięto konto pomyślnie",
	type: "SUCCESS",
}

export const USER_NOT_FOUND: AlertWithoutId = {
	body: "Nie znaleziono użytkownika",
	type: "ERROR",
}

export const TAGS_HAVE_TO_BE_UNIQUE: AlertWithoutId = {
	body: "Tagi nie mogą się powtarzać",
	type: "INFO",
}

export const BLOG_NOT_FOUND: AlertWithoutId = {
	body: "Nie znaleziono bloga o podanym id",
	type: "WARNING",
}

export const BLOG_CREATION_SUCCESSFUL: AlertWithoutId = {
	body: "Utworzono bloga pomyślnie",
	type: "SUCCESS",
}

export const BLOG_UPDATE_SUCCESSFUL: AlertWithoutId = {
	body: "Zaaktualizowano bloga pomyślnie",
	type: "SUCCESS",
}

export const BLOG_DELETION_SUCCESSFUL: AlertWithoutId = {
	body: "Usunięto bloga pomyślnie",
	type: "SUCCESS",
}

export const UPDATE_FORBIDDEN: AlertWithoutId = {
	body: "Nie możesz edytować tego zasobu",
	type: "WARNING",
}
