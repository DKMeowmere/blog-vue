<template>
	<UserForm v-if="user" :user="user" type="UPDATE" />
	<div v-else>Nie znaleziono użytkownika o podanym id</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { UserType } from "@backend/types/user"
import { useAppStore } from "../../app/stores/appStore"
import { ONLY_SELF_ACCOUNT_UPDATE_IS_ALLOWED } from "../../app/constants/alerts"
import { useUser } from "./hooks/useUser"
import UserForm from "./components/UserForm.vue"
import { storeToRefs } from "pinia"

const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const { getUser } = useUser()
const user = ref<UserType | null>(null)
const appState = useAppStore()
const { enqueueAlert } = appState
const { user: loggedUser } = storeToRefs(appState)

onMounted(async () => {
	user.value = await getUser(id.toString())

	setTimeout(() => {
		if (user.value?._id !== loggedUser.value?._id) {
			enqueueAlert(ONLY_SELF_ACCOUNT_UPDATE_IS_ALLOWED)
			user.value ? push(`/user/${user.value._id}`) : push("")
		}
	}, 500)
})
</script>
