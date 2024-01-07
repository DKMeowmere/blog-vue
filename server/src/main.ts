import mongoose from "mongoose"
import { createServer } from "./utils/createServer"
import { MONGO_URI, PORT } from "./config/envVariables"

async function main() {
	try {
		const app = createServer()
		mongoose.set("strictQuery", false)
		await mongoose.connect(MONGO_URI)
		console.log("Connected to db")
		app.listen(PORT)
		console.log(`Listening on port: ${PORT}`)
	} catch (err) {
		console.log(err)
	}
}
main()
