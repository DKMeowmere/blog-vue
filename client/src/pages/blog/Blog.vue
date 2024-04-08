<template>
	<div :is-blog-owner="isBlogOwner">Blog {{ blog }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { BlogType } from "@backend/types/blog/blog"
import { useBlog } from "./hooks/useBlog.ts"
import { useAppStore } from "../../app/stores/appStore.ts"
import { storeToRefs } from "pinia"
import { BLOG_NOT_FOUND } from "../../app/constants/alerts.ts"

const blog = ref<BlogType | null>(null)
const appState = useAppStore()
const { enqueueAlert } = appState
const { user } = storeToRefs(appState)
const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const { getBlog } = useBlog()
const isBlogOwner = computed(
	() => user?.value?._id === blog.value?.author || false
)

onMounted(async () => {
	blog.value = await getBlog(id.toString())

	if (!blog.value) {
		enqueueAlert(BLOG_NOT_FOUND)
		push("/")
	}
})
</script>
