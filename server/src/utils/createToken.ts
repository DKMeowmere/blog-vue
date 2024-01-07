import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config/envVariables"

export function createToken(payload: object | string) {
	const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "7d" })

	return token
}
