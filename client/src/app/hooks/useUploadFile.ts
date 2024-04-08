import { FILE_HAVE_TO_BE_IMAGE } from "../constants/errors"
import { useHandleError } from "./useHandleError"

export function useUploadFile() {
	const { handleErrorWithAlert } = useHandleError()
	const acceptedImageExts = new Set(["jpg", "png", "jpeg"])

	function uploadImage(e: any) {
		try {
			const file: File = e.target?.files[0] || null
			const fileExt = file.name.split(".").pop() || ""

			if (!acceptedImageExts.has(fileExt)) {
				throw new Error(FILE_HAVE_TO_BE_IMAGE)
			}

			return { fileLocation: URL.createObjectURL(file), file }
		} catch (err: unknown) {
			handleErrorWithAlert(err as string)
			return {}
		}
	}

	return { uploadImage }
}
