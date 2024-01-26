export function createFilesMap(
	arr: Express.Multer.File[] 
) {
	const map = new Map()

	arr.forEach(file => {
		map.set(file.originalname, file)
	})

	return map
}
