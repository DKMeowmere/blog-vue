import { UserType } from "@backend/types/user"

export const user: Omit<UserType, "_id"> = {
	name: "Mostar",
	email: "mostar@hercegbosna.hb",
	password: "mostar123",
	biography:
		"Mostar - miasto w Bośni i Hercegowinie, w Federacji Bośni i Hercegowiny, stolica kantonu hercegowińsko-neretwiańskiego, siedziba miasta Mostar. Jest położony nad Neretwą. Stanowi jeden z największych ośrodków miejskich w kraju. W 2013 roku liczyło 60 195 mieszkańców, z czego większość stanowili Chorwaci. ",
	fileLocation: "",
	userBlogs: [],
}
