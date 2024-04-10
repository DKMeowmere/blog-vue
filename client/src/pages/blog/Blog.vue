<template>
	<div v-if="!blog">Nie znaleziono bloga</div>
	<BlogView v-else :is-blog-owner="isBlogOwner" :blog="blog" :author="author" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { BlogType } from "@backend/types/blog/blog"
import { BLOG_NOT_FOUND } from "../../app/constants/alerts.ts"
import { useAppStore } from "../../app/stores/appStore.ts"
import { useBlog } from "./hooks/useBlog.ts"
import BlogView from "./components/view/BlogView.vue"
import { useUser } from "../user/hooks/useUser"
import { UserType } from "@backend/types/user"

const blog = ref<BlogType | null>(null)
const author = ref<UserType | null>(null)
const appState = useAppStore()
const { enqueueAlert } = appState
const { user } = storeToRefs(appState)
const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const { getBlog } = useBlog()
const { getUser } = useUser()
const isBlogOwner = computed(
	() => user?.value?._id === blog.value?.author || false
)

onMounted(async () => {
	blog.value = await getBlog(id.toString())

	if (!blog.value) {
		enqueueAlert(BLOG_NOT_FOUND)
		push("/")
		return
	}
	author.value = await getUser(blog.value.author)
})
</script>
