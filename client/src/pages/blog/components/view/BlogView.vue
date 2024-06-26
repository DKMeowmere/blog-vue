<template>
	<article
		class="w-[90%] max-w-[800px] m-auto flex flex-col gap-5 p-6 rounded-[10px] relative bg-lightMainBg-500 dark:bg-darkMainBg-500 text-blackText dark:text-whiteText"
	>
		<Icon
			v-if="isBlogOwner"
			icon="mdi:update"
			class="absolute top-2.5 right-2.5 cursor-pointer text-[3rem]"
			data-cy="update-blog-btn"
			@click="push(`/blog/${blog._id}/update`)"
		/>
		<h1 class="text-[2rem] text-bold md:text-[3rem]">{{ blog.title }}</h1>
		<img
			:src="validateServerUrl(blog.mainFileLocation) || DEFAULT_BLOG_IMAGE_URL"
			:alt="blog.title"
			class="w-full aspect-video"
		/>
		<router-link
			:to="author ? `/user/${author._id}` : ''"
			class="flex items-center gap-[5px] text-[1.3rem]"
		>
			<Avatar
				alt="author avatar"
				:src="author?.fileLocation || ''"
				width="w-[34px]"
			/>
			<span v-if="author">
				{{ author.name }} |
				{{ creationDate }}
			</span>
			<span v-else>Usunięty użytkownik</span>
		</router-link>
		<div class="w-full flex flex-col">
			<div
				class="w-full flex flex-col justify-center items-center"
				v-for="element in blog.content"
				:key="element._id"
			>
				<Text v-if="element.type === 'TEXT'" :element="element" />
				<Image v-else-if="element.type === 'IMAGE'" :element="element" />
				<Quote v-else-if="element.type === 'QUOTE'" :element="element" />
				<Subtitle v-else-if="element.type === 'SUBTITLE'" :element="element" />
				<List v-else-if="element.type === 'LIST'" :element="element" />
			</div>
		</div>
		<p v-if="blog.source" class="text-[0.8rem] md:text-[1.1rem]">
			Źródło - {{ blog.source }}
		</p>
		<div v-if="blog.tags.length > 0" class="flex gap-2 flex-row flex-wrap">
			<span
				class="p-[5px] rounded-[3px] bg-main text-whiteText text-[0.7rem] font-bold md:p-[7px] md:text-[1rem]"
				v-for="tag in blog.tags"
				:key="tag"
				>{{ tag.toUpperCase() }}</span
			>
		</div>
	</article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { Icon } from "@iconify/vue"
import { BlogType } from "@backend/types/blog/blog"
import { UserType } from "@backend/types/user"
import { useAppStore } from "../../../../app/stores/appStore"
import { validateServerUrl } from "../../../../app/utils/validateServerUrl"
import { DEFAULT_BLOG_IMAGE_URL } from "../../../../app/constants/urls"
import Avatar from "../../../../components/Avatar.vue"
import { computed, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import Image from "./Image.vue"
import Text from "./Text.vue"
import Subtitle from "./Subtitle.vue"
import Quote from "./Quote.vue"
import List from "./List.vue"

type Props = {
	blog: BlogType
	isBlogOwner: boolean
	author: UserType | null
}

const { blog, isBlogOwner, author } = defineProps<Props>()
const { push } = useRouter()
const appState = useAppStore()
const { theme } = storeToRefs(appState)
const creationDate = computed(() =>
	new Date(blog.createdAt as Date).toLocaleDateString("pl-PL", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	})
)
const titleEl = document.querySelector("head title")
const descEl = document.querySelector('head meta[name="description"]')

if (titleEl) {
	titleEl.textContent = blog.title
}

if (descEl) {
	descEl.setAttribute("content", blog.tags.join(" "))
}

onUnmounted(() => {
	if (titleEl) {
		titleEl.textContent = `Blogify`
	}
})
</script>

<style scoped lang="scss">
@import "../../../../app/style/variables";

.blog-container {
	width: 90%;
	max-width: 800px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 25px;
	border-radius: 10px;
	background-color: v-bind("theme.colors.lightMainBg");
	position: relative;
	.update-blog-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		font-size: 3rem;
	}
	h1 {
		font-size: 2rem;
		font-weight: bold;
	}
	.main-blog-image {
		width: 100%;
		aspect-ratio: 16 / 9;
	}
	.author-container {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 1.3rem;
	}
	.blog-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		.blog-element {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	.source {
		font-size: 0.8rem;
	}
	.tags-container {
		display: flex;
		flex-flow: row wrap;
		gap: 8px;
		.tag {
			padding: 5px;
			border-radius: 3px;
			background-color: v-bind("theme.colors.main");
			color: v-bind("theme.colors.whiteText");
			font-size: 0.7rem;
			font-weight: bold;
		}
	}
}

@media screen and (min-width: $breakpoints-md) {
	.blog-container {
		h1 {
			font-size: 3rem;
		}
		.source {
			font-size: 1.1rem;
		}
		.tags-container {
			.tag {
				padding: 7px;
				font-size: 1rem;
			}
		}
	}
}
</style>
