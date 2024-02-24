<template>
	<p>Czy na pewno?</p>
	<Button
		type="button"
		@click="deleteUser(id.toString())"
		:bg-color="theme.colors.errorMain"
		width="80%"
		max-width="500px"
	>
		Usuń konto
	</Button>
</template>

<script setup lang="ts">
import { useUser } from "../hooks/useUser"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"
import { useAppStore } from "../../../app/stores/appStore"
import Button from "../../../components/Button.vue"

const appState = useAppStore()
const { theme } = storeToRefs(appState)
const { deleteUser } = useUser()
const { params } = useRoute()
const { id } = params
</script>

<style lang="scss" scoped style="scss">
p {
	font-size: 2rem;
}
</style>
