import fs from "fs/promises"
import { doFileExists } from "./doFileExists"

export async function removeFile(path: string) {
	if (await doFileExists(path)) {
		await fs.unlink(path)
	}
}
