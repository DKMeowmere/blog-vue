import { UserType } from "../../types/user"

export function getUser(): Omit<UserType, "createdAt" | "updatedAt"> {
	return {
		_id: "id",
		name: "user name",
		email: "email@user.com",
		password: "password",
		biography: "biography",
		fileLocation: "",
		userBlogs: [],
	}
}
