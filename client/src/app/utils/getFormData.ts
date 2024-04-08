export function getFormData(
	data: { [key: string]: any } = {},
	filesKeyName: string = "file",
	files: (File | null)[] = []
) {
	const formData = new FormData()
	Object.entries(data).forEach(([key, value]) => {
		if (typeof value === "object") {
			formData.append(key, JSON.stringify(value))
		} else {
			formData.append(key, value)
		}
	})

	files.forEach(file => {
		file && formData.append(filesKeyName, file)
	})

	return formData
}
