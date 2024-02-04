<template>
	<Navbar />
	<LoadingScreen v-if="isLoading" />
	<Alerts />
	<main class="container">
		<router-view />
	</main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "./app/stores/appStore"
import LoadingScreen from "./components/LoadingScreen.vue"
import Alerts from "./components/alert/AlertsContainer.vue"

const appStore = useAppStore()
const { setupTheme } = appStore
const { theme, isLoading } = storeToRefs(appStore)

if (window.Cypress) {
	window.store = { app: appStore }
}

setupTheme()
</script>

<style scoped>
.container {
	width: 100%;
	min-height: 100vh;
	padding: 80px 0;
	background-color: v-bind("theme.colors.mainBg");
	color: v-bind("theme.colors.text");
}
</style>
