<template>
	<Button @click="push('/blog/create')">Stwórz blog</Button>
	<h1>Najnowsze blogi</h1>
	<BlogCards :blogs="blogs" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import Button from "../components/Button.vue"
import { useBlog } from "./blog/hooks/useBlog"
import BlogCards from "../components/blogCard/BlogCards.vue"
import { BlogType } from "@backend/types/blog/blog"
import { onMounted, ref } from "vue"

const { push } = useRouter()
const { getBlogs } = useBlog()
const blogs = ref<BlogType[]>([])

onMounted(async () => {
	blogs.value = await getBlogs()
})
</script>

<style scoped lang="scss">
h1 {
	font-size: 3rem;
	text-align: center;
	margin-top: 30px;
}
button {
	width: 80%;
	max-width: 400px;
}
</style>
