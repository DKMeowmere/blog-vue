<template>
	<article v-if="user">
		<h1 class="user-name" data-cy="user-name">{{ user.name }}</h1>
		<Avatar
			alt="Zdjęcie profilowe"
			:src="user.fileLocation || ''"
			width="50%"
			data-cy="user-avatar"
		/>
		<p class="biography" data-cy="user-biography">{{ user.biography }}</p>
		<h2>Blogi użytkownika:</h2>
		<BlogCards :blogs="user.userBlogs as BlogType[]" />
		<template v-if="isUserAccountOwner">
			<Button
				width="60%"
				@click="push(`/user/${id}/update`)"
				data-cy="update-link"
			>
				Edytuj
			</Button>
			<Button width="60%" @click="logout" data-cy="logout-btn">
				Wyloguj się
			</Button>
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
import BlogCards from "../../components/blogCard/BlogCards.vue"
import { BlogType } from "@backend/types/blog/blog"

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
	.user-name {
		font-size: 2.6rem;
	}
	.biography {
		font-size: 1rem;
		font-style: italic;
		text-align: center;
	}
	h2 {
		font-size: 2rem;
	}
}
@media screen and (min-width: $breakpoints-sm) {
	article {
		max-width: 700px;
		.user-name {
			font-size: 3.2rem;
		}
		.biography {
			font-size: 1.4rem;
		}
		h2 {
			font-size: 2.4rem;
		}
	}
}
@media screen and (min-width: $breakpoints-md) {
	article {
		max-width: 900px;
		.user-name {
			font-size: 4.4rem;
		}
		.biography {
			font-size: 1.8rem;
		}
		h2 {
			font-size: 3rem;
		}
	}
}
@media screen and (min-width: $breakpoints-lg) {
	article {
		max-width: 1000px;
	}
}
</style>
