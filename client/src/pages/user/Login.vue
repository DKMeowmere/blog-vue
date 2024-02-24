<template>
	<UserForm type="LOGIN" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { useAppStore } from "../../app/stores/appStore"
import { ALREADY_LOGGED_IN } from "../../app/constants/alerts"
import UserForm from "./components/UserForm.vue"

const { push } = useRouter()
const appState = useAppStore()
const { enqueueAlert } = appState
const { user } = storeToRefs(appState)

if (user.value) {
	enqueueAlert(ALREADY_LOGGED_IN)
	push(`/user/${user.value._id}`)
}
</script>
