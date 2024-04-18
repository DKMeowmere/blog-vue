<template>
	<Button @click="push('/blog/create')">Stwórz blog</Button>
	<h1>Najnowsze blogi</h1>
	<SearchBar
		width="w-[80%]"
		height="h-[40px]"
		max-width="500px"
		v-model="query"
		:autocomplete-data="query ? blogTitles : []"
	/>
	<BlogCards :blogs="filteredBlogs" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import Button from "../components/Button.vue"
import { useBlog } from "./blog/hooks/useBlog"
import BlogCards from "../components/blogCard/BlogCards.vue"
import { BlogType } from "@backend/types/blog/blog"
import { computed, onMounted, ref } from "vue"
import SearchBar from "../components/SearchBar.vue"

const { push } = useRouter()
const { getBlogs } = useBlog()
const blogs = ref<BlogType[]>([])
const query = ref("")
const filteredBlogs = computed(() =>
	blogs.value.filter(blog =>
		blog.title.toLowerCase().includes(query.value.toLowerCase())
	)
)
const blogTitles = computed(() =>
	filteredBlogs.value.map(blog => ({ value: blog.title, _id: blog._id }))
)

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
