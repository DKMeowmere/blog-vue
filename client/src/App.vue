<template>
	<Navbar :key="$route.fullPath" />
	<LoadingScreen v-if="isLoading"/>
	<Alerts />
	<main
		class="w-full min-h-screen py-36 px-20 bg-lightMainBg-500 dark:bg-darkMainBg-500 text-blackText dark:text-whiteText"
	>
		<router-view />
	</main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "./app/stores/appStore"
import { useUser } from "./pages/user/hooks/useUser"
import LoadingScreen from "./components/LoadingScreen.vue"
import Alerts from "./components/alert/AlertsContainer.vue"
import Navbar from "./components/Navbar.vue"

const appStore = useAppStore()
const { loginWithToken } = useUser()
const { setupTheme } = appStore
const { isLoading } = storeToRefs(appStore)

if (window.Cypress) {
	window.store = { app: appStore }
}
loginWithToken()
setupTheme()
</script>

<!-- <style scoped>
.container {
	width: 100%;
	min-height: 100vh;
	padding: 140px 0 80px 0;
	background-color: v-bind("theme.colors.mainBg");
	color: v-bind("theme.colors.text");
}
</style> -->
