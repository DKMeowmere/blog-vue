import { useCookies } from "vue3-cookies"
import { useHandleError } from "../../../app/hooks/useHandleError"
import { getFileFromUrl } from "../../../app/utils/getFileFromUrl"
import { useAppStore } from "../../../app/stores/appStore"
import { SERVER_URL } from "../../../app/constants/urls"
import {
	TITLE_MISSING,
	LOGGED_IN_IS_REQUIRED,
	FILE_MISSING,
} from "../../../app/constants/errors"
import { getFormData } from "../../../app/utils/getFormData"
import {
	BLOG_CREATION_SUCCESSFUL,
	BLOG_DELETION_SUCCESSFUL,
	BLOG_UPDATE_SUCCESSFUL,
} from "../../../app/constants/alerts"

export function useBlog() {
	const { handleErrorWithAlert } = useHandleError()
	const { startLoading, endLoading, user, enqueueAlert } = useAppStore()
	const { cookies } = useCookies()

	async function getBlog(id: string) {
		try {
			startLoading()
			const res = await fetch(`${SERVER_URL}/api/blog/${id}`)
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

	async function getBlogs(limit: number) {
		try {
			startLoading()
			const res = await fetch(`${SERVER_URL}/api/blog?limit=${limit || 0}`)
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

	type CreateBlogProps = {
		title: string
		source: string
		tags: string[]
		mainFileLocation: string
		fileName: string
	}

	async function createBlog({
		title,
		source,
		tags,
		mainFileLocation,
		fileName,
	}: CreateBlogProps) {
		try {
			startLoading()

			if (!user) {
				throw new Error(LOGGED_IN_IS_REQUIRED)
			}

			if (!title) {
				throw new Error(TITLE_MISSING)
			}

			if (!mainFileLocation) {
				throw new Error(FILE_MISSING)
			}

			const mainFile = await getFileFromUrl(mainFileLocation, fileName)
			const body = getFormData(
				{
					title,
					source,
					tags,
					content: [],
					mainFileLocation: fileName,
				},
				"files",
				[mainFile || null]
			)

			const res = await fetch(`${SERVER_URL}/api/blog`, {
				method: "POST",
				body,
				headers: {
					authorization: `Bearer ${cookies.get("token")}`,
				},
			})
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			enqueueAlert(BLOG_CREATION_SUCCESSFUL)
			endLoading()

			return data
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	type UpdateBlogProps = {
		_id: string
		title: string
		source: string
		tags: string[]
		mainFileLocation?: string
		fileName: string
	}

	async function updateBlog({
		_id,
		title,
		source,
		tags,
		mainFileLocation,
		fileName,
	}: UpdateBlogProps) {
		try {
			startLoading()

			if (!user) {
				throw new Error(LOGGED_IN_IS_REQUIRED)
			}

			if (!title) {
				throw new Error(TITLE_MISSING)
			}

			const file = await getFileFromUrl(mainFileLocation, fileName)
			const body = getFormData({ title, source, tags }, "file", [file || null])

			const res = await fetch(`${SERVER_URL}/api/blog/${_id}`, {
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

			enqueueAlert(BLOG_UPDATE_SUCCESSFUL)
			endLoading()
			return data
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	async function deleteBlog(id: string) {
		try {
			startLoading()

			if (!user) {
				throw new Error(LOGGED_IN_IS_REQUIRED)
			}

			const res = await fetch(`${SERVER_URL}/api/blog/${id}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${cookies.get("token")}`,
				},
			})
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			enqueueAlert(BLOG_DELETION_SUCCESSFUL)
			endLoading()
			return data
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
		}
	}

	return { getBlog, getBlogs, createBlog, updateBlog, deleteBlog }
}
