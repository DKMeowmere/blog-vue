import { envSchema } from "../../types/env"

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string)
const PORT = parseInt(process.env.PORT as string)

const unvalidatedEnv = {
  MONGO_URI: process.env.MONGO_URI,
	TOKEN_SECRET: process.env.TOKEN_SECRET,
	CLIENT_APP_URL: process.env.CLIENT_APP_URL,
	NODE_ENV: process.env.NODE_ENV,
	PORT,
	SALT_ROUNDS,
}

export const env = envSchema.parse(unvalidatedEnv)
