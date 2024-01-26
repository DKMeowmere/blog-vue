import { UserType } from "../../types/user"
import { User } from "../../src/models/user"

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

export async function saveUser(user: UserType) {
	await User.create(user)
}
