import { useCookies } from "vue3-cookies"
import { useAppStore } from "../../../app/stores/appStore"
import { getFileFromUrl } from "../../../app/utils/getFileFromUrl"
import { useHandleError } from "../../../app/hooks/useHandleError"
import { SERVER_URL } from "../../../app/constants/urls"
import {
	EMAIL_MISSING,
	PASSWORD_MISSING,
	NAME_MISSING,
	FILE_MISSING,
} from "../../../app/constants/errors"
import {
	LOGIN_SUCCESSFUL,
	LOGOUT_SUCCESSFUL,
	USER_UPDATE_SUCCESSFUL,
	USER_DELETION_SUCCESSFUL,
} from "../../../app/constants/alerts"

export function useUser() {
	const { handleErrorWithAlert, handleError } = useHandleError()
	const { setUser, startLoading, endLoading, enqueueAlert, setToken } =
		useAppStore()
	const { cookies } = useCookies()

	async function getUser(id: string) {
		try {
			const res = await fetch(`${SERVER_URL}/api/user/${id}`)
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			endLoading()
			return data
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	async function login(email: string, password: string) {
		try {
			startLoading()
			if (!email) {
				throw new Error(EMAIL_MISSING)
			}

			if (!password) {
				throw new Error(PASSWORD_MISSING)
			}

			const body = JSON.stringify({ email, password })

			const res = await fetch(`${SERVER_URL}/api/user/login`, {
				method: "POST",
				body,
				headers: {
					"Content-Type": "application/json",
				},
			})
			const { token, user, error } = await res.json()

			if (!res.ok) {
				throw new Error(error)
			}

			enqueueAlert(LOGIN_SUCCESSFUL)
			setUser(user)
			cookies.set("token", token, "28d")
			setToken(token)
			endLoading()
      return user
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	async function loginWithToken() {
		try {
			if (!cookies.get("token")) {
				cookies.set("token", "", "")
				return
			}

			startLoading()
			const res = await fetch(`${SERVER_URL}/api/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${cookies.get("token")}`,
				},
			})
			const { token, user, error } = await res.json()

			if (!res.ok) {
				throw new Error(error)
			}

			setUser(user)
			cookies.set("token", token, "28d")
			setToken(token)
			endLoading()
      return user
		} catch {
			handleError()
		}
	}

	function logout() {
		setUser(null)
		cookies.set("token", "")
		setToken("")
		enqueueAlert(LOGOUT_SUCCESSFUL)
	}

	type CreateUserProps = {
		email: string
		password: string
		name: string
		fileLocation: string
		fileName: string
	}

	async function createUser({
		email,
		password,
		name,
		fileLocation,
		fileName,
	}: CreateUserProps) {
		try {
			startLoading()

			if (!name) {
				throw new Error(NAME_MISSING)
			}
			if (!email) {
				throw new Error(EMAIL_MISSING)
			}
			if (!password) {
				throw new Error(PASSWORD_MISSING)
			}
			if (!fileLocation) {
				throw new Error(FILE_MISSING)
			}

			const body = new FormData()
			body.append("name", name)
			body.append("email", email)
			body.append("password", password)
			body.append("biography", "")
			const file = await getFileFromUrl(fileLocation, fileName)
			file && body.append("file", file)

			const res = await fetch(`${SERVER_URL}/api/user`, {
				method: "POST",
				body,
			})
			const { token, user, error } = await res.json()

			if (!res.ok) {
				throw new Error(error)
			}

			enqueueAlert(LOGIN_SUCCESSFUL)
			setUser(user)
			cookies.set("token", token, "28d")
			setToken(token)
			endLoading()
      return user
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	type UpdateUserProps = {
		_id: string
		name: string
		biography: string
		fileLocation: string
		fileName: string
	}

	async function updateUser({
		_id,
		name,
		fileLocation,
		biography,
		fileName,
	}: UpdateUserProps) {
		try {
			startLoading()

			const body = new FormData()
			body.append("name", name)
			body.append("biography", biography)
			const file = await getFileFromUrl(fileLocation, fileName)
			file && body.append("file", file)

			const res = await fetch(`${SERVER_URL}/api/user/${_id}`, {
				method: "PATCH",
				body,
				headers: {
					authorization: `Bearer ${cookies.get("token")}`,
				},
			})
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			enqueueAlert(USER_UPDATE_SUCCESSFUL)
			setUser(data)
			endLoading()
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	async function deleteUser(id: string) {
		try {
			startLoading()

			const res = await fetch(`${SERVER_URL}/api/user/${id}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${cookies.get("token")}`,
				},
			})
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			enqueueAlert(USER_DELETION_SUCCESSFUL)
			logout()
		} catch {
			handleError()
		}
	}

	return {
		login,
		logout,
		createUser,
		getUser,
		updateUser,
		deleteUser,
		loginWithToken,
	}
}
