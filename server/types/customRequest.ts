import { Request as RequestType } from "express"
import { UserType } from "./user"

export interface CustomRequest extends RequestType {
	user?: UserType | null
}
