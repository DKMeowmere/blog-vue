<template>
	<div v-if="!user">Zadowanie...</div>
	<BlogForm v-else-if="blog" type="UPDATE" :blog="blog" />
	<div v-else>Nie znaleziono bloga o podanym id</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { BlogType } from "@backend/types/blog/blog"
import { useBlog } from "./hooks/useBlog.ts"
import { useAppStore } from "../../app/stores/appStore.ts"
import { LOGGED_IN_IS_REQUIRED } from "../../app/constants/errors.ts"
import { BLOG_NOT_FOUND, UPDATE_FORBIDDEN } from "../../app/constants/alerts.ts"
import BlogForm from "./components/form/BlogForm.vue"

const appState = useAppStore()
const { enqueueAlert } = appState
const { user } = storeToRefs(appState)
const blog = ref<BlogType | null>(null)
const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const { getBlog } = useBlog()

onMounted(async () => {
	blog.value = await getBlog(id.toString())

	setTimeout(() => {
		if (!blog.value) {
			enqueueAlert(BLOG_NOT_FOUND)
			push(`/user/login`)
			return
		}

		if (!user.value) {
			enqueueAlert({ type: "INFO", body: LOGGED_IN_IS_REQUIRED })
			push(`/user/login`)
			return
		}

		if (user.value?._id !== blog?.value?.author) {
			enqueueAlert(UPDATE_FORBIDDEN)
			push(`/blog/${blog.value._id}`)
		}
	}, 500)
})
</script>
