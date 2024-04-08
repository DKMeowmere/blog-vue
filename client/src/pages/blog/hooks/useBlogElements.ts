import { useCookies } from "vue3-cookies"
import { useHandleError } from "../../../app/hooks/useHandleError"
import { useAppStore } from "../../../app/stores/appStore"
import { SERVER_URL } from "../../../app/constants/urls"
import { getFormData } from "../../../app/utils/getFormData"
import { getFileFromUrl } from "../../../app/utils/getFileFromUrl"

export function useBlogElements() {
	const { handleErrorWithAlert } = useHandleError()
	const { startLoading, endLoading } = useAppStore()
	const { cookies } = useCookies()

	type TextElementActionProps = {
		blogId: string
		elementId?: string
		body: string
	}

	async function textElementServerAction({
		blogId,
		elementId,
		body,
	}: TextElementActionProps) {
		try {
			startLoading()

			const formData = getFormData({ body, type: "TEXT" })

			const res = await fetch(
				`${SERVER_URL}/api/blog/${blogId}/${elementId || ""}`,
				{
					method: elementId ? "PATCH" : "POST",
					body: formData,
					headers: {
						authorization: `Bearer ${cookies.get("token")}`,
					},
				}
			)
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

	type ImageElementActionProps = {
		blogId: string
		elementId?: string
		alt: string
		fileLocation: string
		fileName: string
	}

	async function imageElementServerAction({
		blogId,
		elementId,
		alt,
		fileLocation,
		fileName,
	}: ImageElementActionProps) {
		try {
			startLoading()

			const file = await getFileFromUrl(fileLocation, fileName)
			const formData = getFormData({ alt, type: "IMAGE" }, "file", [
				file || null,
			])

			const res = await fetch(
				`${SERVER_URL}/api/blog/${blogId}/${elementId || ""}`,
				{
					method: elementId ? "PATCH" : "POST",
					body: formData,
					headers: {
						authorization: `Bearer ${cookies.get("token")}`,
					},
				}
			)
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

	type QuoteElementActionProps = {
		blogId: string
		elementId?: string
		body: string
		author: string
	}

	async function quoteElementServerAction({
		blogId,
		elementId,
		body,
		author,
	}: QuoteElementActionProps) {
		try {
			startLoading()

			const formData = getFormData({ body, author, type: "QUOTE" })

			const res = await fetch(
				`${SERVER_URL}/api/blog/${blogId}/${elementId || ""}`,
				{
					method: elementId ? "PATCH" : "POST",
					body: formData,
					headers: {
						authorization: `Bearer ${cookies.get("token")}`,
					},
				}
			)
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

	type subtitleElementActionProps = {
		blogId: string
		elementId?: string
		body: string
	}

	async function subtitleElementServerAction({
		blogId,
		elementId,
		body,
	}: subtitleElementActionProps) {
		try {
			startLoading()

			const formData = getFormData({ body, type: "SUBTITLE" })

			const res = await fetch(
				`${SERVER_URL}/api/blog/${blogId}/${elementId || ""}`,
				{
					method: elementId ? "PATCH" : "POST",
					body: formData,
					headers: {
						authorization: `Bearer ${cookies.get("token")}`,
					},
				}
			)
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

	type listElementActionProps = {
		blogId: string
		elementId?: string
		title: string
		listContent: { body: string }[]
	}

	async function listElementServerAction({
		blogId,
		elementId,
		listContent,
		title,
	}: listElementActionProps) {
		try {
			startLoading()

			const formData = getFormData({ listContent, title, type: "LIST" })

			const res = await fetch(
				`${SERVER_URL}/api/blog/${blogId}/${elementId || ""}`,
				{
					method: elementId ? "PATCH" : "POST",
					body: formData,
					headers: {
						authorization: `Bearer ${cookies.get("token")}`,
					},
				}
			)
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

	async function deleteBlogElement(blogId: string, elementId: string) {
		try {
			startLoading()

			const res = await fetch(`${SERVER_URL}/api/blog/${blogId}/${elementId}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${cookies.get("token")}`,
				},
			})
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

	return {
		textElementServerAction,
		imageElementServerAction,
		quoteElementServerAction,
		subtitleElementServerAction,
		listElementServerAction,
		deleteBlogElement,
	}
}
