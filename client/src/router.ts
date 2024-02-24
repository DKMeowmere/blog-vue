import { createRouter, createWebHistory } from "vue-router"
import NotFoundPage from "./pages/NotFoundPage.vue"
import Home from "./pages/Home.vue"
import CreateUser from "./pages/user/CreateUser.vue"
import Login from "./pages/user/Login.vue"
import UpdateUser from "./pages/user/UpdateUser.vue"
import UserProfile from "./pages/user/UserProfile.vue"

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", name: "Home", component: Home },
		{ path: "/user/login", name: "Login", component: Login },
		{ path: "/user/create", name: "Create User", component: CreateUser },
		{ path: "/user/:id", name: "User Profile", component: UserProfile },
		{ path: "/user/:id/update", name: "Update User", component: UpdateUser },
		{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
	],
})
