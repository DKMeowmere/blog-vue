<template>
	<Navbar />
	<p @click="addAlert()">Srbija</p>
	<LoadingScreen v-if="isLoading" />
	<Alerts />
	<main class="container">
		<router-view />
	</main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { useAppStore } from "./app/stores/appStore"
import LoadingScreen from "./components/LoadingScreen.vue"
import Alerts from "./components/alert/AlertsContainer.vue"

const appStore = useAppStore()
const { setupTheme, enqueueAlert } = appStore
const { theme, isLoading } = storeToRefs(appStore)
const num = ref(0)

if (window.Cypress) {
	window.store = { app: appStore }
}

function addAlert() {
	num.value++
	enqueueAlert({
		body: `Bosna podjede ${num.value}`,
		type: "SUCCESS",
	})
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
