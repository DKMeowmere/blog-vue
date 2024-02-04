import { createRouter, createWebHistory } from "vue-router"
import NotFoundPage from "./pages/NotFoundPage.vue"

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
	],
})
