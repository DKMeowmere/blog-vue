import { UserType } from "../../types/user"

export function generateUser(): Omit<UserType, "createdAt" | "updatedAt"> {
	const email = `${crypto.randomUUID()}@user.com`
	return {
		_id: crypto.randomUUID(),
		name: "user name",
		email,
		password: "password",
		biography: "biography",
		fileLocation: "file location",
		userBlogs: [],
	}
}
