<template>
	<div
		class="w-[90%] bg-lightMainBg-400 dark:bg-darkMainBg-400 rounded-lg p-2.5 cursor-pointer md:w-[45%] lg:w-[30%]"
		@click="push(`/blog/${blog._id}`)"
	>
		<header class="flex justify-between items-center mr-1 mb-2.5">
			<strong class="text-sm"
				>{{ blog.title }} - {{ getCreationDate(blog) }}</strong
			>
			<div
				:to="author ? `/user/${author._id}` : ''"
				class="flex items-center gap-1 text-base"
			>
				<Avatar
					alt="author avatar"
					:src="author?.fileLocation || ''"
					width="w-[31px]"
				/>
				<span v-if="author">
					{{ author.name }}
				</span>
				<span v-else>Usunięty użytkownik</span>
			</div>
		</header>
		<div class="w-full inline-block overflow-hidden">
			<img
				:src="
					validateServerUrl(blog.mainFileLocation) || DEFAULT_BLOG_IMAGE_URL
				"
				class="w-full aspect-video object-cover hover:scale-110"
				:alt="blog.title"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { BlogType } from "@backend/types/blog/blog"
import { validateServerUrl } from "../../app/utils/validateServerUrl"
import { DEFAULT_BLOG_IMAGE_URL } from "../../app/constants/urls"
import { UserType } from "@backend/types/user"
import { useUser } from "../../pages/user/hooks/useUser"
import { onMounted, ref } from "vue"
import Avatar from "../Avatar.vue"

type Props = {
	blog: BlogType
}

const { blog } = defineProps<Props>()
const author = ref<UserType | null>(null)
const { getUser } = useUser()
const { push } = useRouter()

onMounted(async () => {
	author.value = await getUser(blog.author)
})

function getCreationDate(blog: BlogType) {
	return new Date(blog.createdAt as Date).toLocaleDateString("pl-PL", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}
</script>

<!-- <style scoped lang="scss">
@import "../../app/style/variables";

.user-blog {
	width: 90%;
	background-color: v-bind("theme.colors.lightMainBg");
	border-radius: 10px;
	padding: 10px;
	cursor: pointer;
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 10px 5px;
		strong {
			font-size: 0.9rem;
		}
		.author-container {
			display: flex;
			align-items: center;
			gap: 5px;
			font-size: 1rem;
		}
	}
	&:hover .img-wrapper img {
		scale: 1.1;
	}
	.img-wrapper {
		width: 100%;
		display: inline-block;
		overflow: hidden;
		img {
			width: 100%;
			aspect-ratio: 16 / 9;
			object-fit: cover;
		}
	}
}

@media screen and (min-width: $breakpoints-md) {
	.user-blog {
		width: 45%;
	}
}
@media screen and (min-width: $breakpoints-xl) {
	.user-blog {
		width: 30%;
	}
}
</style> -->
