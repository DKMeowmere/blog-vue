import fs from "fs"

export async function writeLogsToFile(fileName: string) {
	const path = `./__tests__/logs/${fileName}.log`
	fs.writeFileSync(path, "")

	const LogToConsole = console.log
	console.log = async (message: any) => {
		if (typeof message === "object") {
			fs.appendFileSync(path, JSON.stringify(message) + "\n")
		} else {
			fs.appendFileSync(path, message + "\n")
		}

		LogToConsole(message)
	}
}
