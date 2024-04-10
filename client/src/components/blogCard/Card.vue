<template>
	<div class="user-blog" @click="push(`/blog/${blog._id}`)">
		<header>
			<strong>{{ blog.title }} - {{ getCreationDate(blog) }}</strong>
			<div :to="author ? `/user/${author._id}` : ''" class="author-container">
				<Avatar
					alt="author avatar"
					:src="author?.fileLocation || ''"
					width="31px"
				/>
				<span v-if="author">
					{{ author.name }}
				</span>
				<span v-else>Usunięty użytkownik</span>
			</div>
		</header>
		<div class="img-wrapper">
			<img
				:src="
					validateServerUrl(blog.mainFileLocation) || DEFAULT_BLOG_IMAGE_URL
				"
				:alt="blog.title"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { BlogType } from "@backend/types/blog/blog"
import { validateServerUrl } from "../../app/utils/validateServerUrl"
import { useRouter } from "vue-router"
import { useAppStore } from "../../app/stores/appStore"
import { storeToRefs } from "pinia"
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
const appState = useAppStore()
const { theme } = storeToRefs(appState)

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

<style scoped lang="scss">
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
			font-size: 1.3rem;
		}
	}
	&:hover .img-wrapper img {
		scale: 1.1;
	}
	.img-wrapper {
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
@media screen and (min-width: $breakpoints-lg) {
	.user-blog {
		width: 30%;
	}
}
</style>
