<template>
	<article v-if="user">
		<h1>{{ user.name }}</h1>
		<Avatar
			alt="Zdjęcie profilowe"
			:src="user.fileLocation || ''"
			width="60%"
		/>
		<p class="biography">{{ user.biography }}</p>
		<template v-if="isUserAccountOwner">
			<Button width="60%" @click="push(`/user/${id}/update`)"> Edytuj </Button>
			<Button width="60%" @click="logout"> Wyloguj się </Button>
		</template>
	</article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { UserType } from "@backend/types/user"
import { USER_NOT_FOUND } from "../../app/constants/alerts"
import { useAppStore } from "../../app/stores/appStore"
import { useUser } from "./hooks/useUser"
import Avatar from "../../components/Avatar.vue"
import Button from "../../components/Button.vue"

const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const { getUser, logout } = useUser()
const appState = useAppStore()
const { enqueueAlert } = appState
const { user: loggedUser } = storeToRefs(appState)
const user = ref<UserType | null>(null)
const isUserAccountOwner = computed(
	() => loggedUser.value?._id === user.value?._id
)

onMounted(async () => {
	user.value = await getUser(id.toString())

	if (!user.value) {
		enqueueAlert(USER_NOT_FOUND)
		push("/")
	}
})
</script>

<style scoped lang="scss">
@import "../../app/style/variables";

article {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: auto;
	width: 90%;
	max-width: 500px;
	gap: 40px;
	h1 {
		font-size: 1.6rem;
	}
	.biography {
		font-size: 1rem;
		font-style: italic;
		text-align: center;
	}
}
@media screen and (min-width: $breakpoints-sm) {
	article {
		max-width: 700px;
		h1 {
			font-size: 2.2rem;
		}
		.biography {
			font-size: 1.4rem;
		}
	}
}
@media screen and (min-width: $breakpoints-md) {
	article {
		max-width: 900px;
		h1 {
			font-size: 3rem;
		}
		.biography {
			font-size: 1.8rem;
		}
	}
}
</style>
