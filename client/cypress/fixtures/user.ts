import { UserType } from "@backend/types/user"

export const user: Omit<UserType, "_id"> = {
	name: "Test",
	email: "test@test.com",
	password: "admin123",
	biography: "test biography",
	fileLocation: "",
	userBlogs: [],
}
