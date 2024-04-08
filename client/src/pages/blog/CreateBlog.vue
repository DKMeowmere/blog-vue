<template>
	<div v-if="!user">Ładowanie...</div>
	<BlogForm v-else type="CREATE" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useAppStore } from "../../app/stores/appStore.ts"
import BlogForm from "./components/form/BlogForm.vue"
import { LOGGED_IN_IS_REQUIRED } from "../../app/constants/errors.ts"

const appState = useAppStore()
const { enqueueAlert } = appState
const { user } = storeToRefs(appState)
const { push } = useRouter()

onMounted(async () => {
  setTimeout(() => {
		if (!user.value) {
			enqueueAlert({ type: "INFO", body: LOGGED_IN_IS_REQUIRED })
			push(`/user/login`)
		}
	}, 500)
})
</script>
