<template>
	<section v-if="blogs.length > 0" class="w-full my-5 flex row flex-wrap justify-center items-center gap-4">
		<Card
			v-for="blog in blogs"
			:key="blog._id"
      :blog="blog"
		/>
		</section>
</template>

<script setup lang="ts">
import { BlogType } from "@backend/types/blog/blog"
import Card from "./Card.vue"

type Props = {
	blogs: BlogType[]
}

const { blogs } = defineProps<Props>()
</script>

<!-- <style scoped lang="scss">
@import "../../app/style/variables";

.user-blogs {
	width: 100%;
	margin: 20px 0;
	display: flex;
	flex-flow: wrap row;
	justify-content: center;
	align-items: center;
	gap: 15px;
}
</style> -->
