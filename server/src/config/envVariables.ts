import path from "path"
import { config } from "dotenv"
import { fileURLToPath } from "url"
import { envSchema } from "../../types/env"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config({
	path: path.join(
		__dirname,
		`./env/.env.${process.env.NODE_ENV?.toLowerCase()}`
	),
})

//put your development.env, production.env, test.env in env dir
// type in /types/env

const unvalidatedEnv = {
	MONGO_URI: process.env.MONGO_URI,
	TOKEN_SECRET: process.env.TOKEN_SECRET,
	CLIENT_APP_URL: process.env.CLIENT_APP_URL,
	NODE_ENV: process.env.NODE_ENV?.toUpperCase(),
	FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
	PORT: parseInt(process.env.PORT as string),
	SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS as string),
}

export const {
	CLIENT_APP_URL,
	FILE_UPLOAD_PATH,
	MONGO_URI,
	NODE_ENV,
	PORT,
	SALT_ROUNDS,
	TOKEN_SECRET,
} = envSchema.parse(unvalidatedEnv)
