import { z } from "zod"

const nodeEnvEnum = ["PRODUCTION", "DEVELOPMENT", "TEST"] as const

export const envSchema = z.object({
	PORT: z.number(),
	MONGO_URI: z.string(),
	TOKEN_SECRET: z.string(),
	CLIENT_APP_URL: z.string(),
	NODE_ENV: z.enum(nodeEnvEnum),
	FILE_UPLOAD_PATH: z.string(),
	SALT_ROUNDS: z.number().positive(),
})

export type Env = z.infer<typeof envSchema>
