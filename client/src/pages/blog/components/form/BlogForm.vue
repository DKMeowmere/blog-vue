<template>
	<h1 v-if="type === 'CREATE'">Stwórz blog</h1>
	<h1 v-if="type === 'UPDATE'">Edytuj blog</h1>
	<form @submit.prevent="handleSubmit">
		<p>Tytuł</p>
		<input
			type="text"
			v-model="title"
			data-cy="title-input"
			placeholder="Tytuł..."
		/>
		<p>Źródło (opcjonalnie)</p>
		<input
			type="text"
			v-model="source"
			data-cy="source-input"
			placeholder="Źródło..."
		/>
		<p>Tagi</p>
		<Tags
			:tags="tags"
			:add-tag-cb="value => tags.push(value)"
			:remove-tag-cb="value => (tags = tags.filter(tag => tag !== value))"
		/>
		<p>Zdjęcie bloga</p>
		<FileInput
			id="user-file-input"
			data-cy="file-input"
			text="Dodaj zdjęcie bloga"
			:change-cb="handleImageUpload"
		/>
		<img
			alt="main blog image"
			:src="validateServerUrl(mainFileLocation) || DEFAULT_BLOG_IMAGE_URL"
			@error="mainFileLocation = ''"
			class="main-blog-image"
		/>
		<template v-if="type === 'UPDATE'">
			<Button width="100%" @click="isContentModalOpen = true">
				Edytuj zawartość bloga
			</Button>
			<Modal v-if="isContentModalOpen" @close="isContentModalOpen = false">
				<ContentContainer
					:blog-id="id.toString()"
					:content="content"
					:update-content="newContent => (content = newContent)"
				/>
			</Modal>
		</template>
		<Button width="100%" type="submit">Zatwierdź</Button>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { BlogType } from "@backend/types/blog/blog"
import { useBlog } from "../../hooks/useBlog"
import { DEFAULT_BLOG_IMAGE_URL } from "../../../../app/constants/urls"
import { useUploadFile } from "../../../../app/hooks/useUploadFile"
import { validateServerUrl } from "../../../../app/utils/validateServerUrl"
import Tags from "./Tags.vue"
import Modal from "../../../../components/Modal.vue"
import ContentContainer from "./ContentContainer.vue"
import Button from "../../../../components/Button.vue"
import FileInput from "../../../../components/FileInput.vue"

const { type, blog } = defineProps<{
	type: "CREATE" | "UPDATE"
	blog?: BlogType
}>()
const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const { uploadImage } = useUploadFile()
const { createBlog, updateBlog } = useBlog()
const isContentModalOpen = ref(false)
const title = ref(blog?.title || "")
const source = ref(blog?.source || "")
const content = ref(blog?.content || [])
const tags = ref(blog?.tags || [])
const mainFileLocation = ref(blog?.mainFileLocation || "")
const fileName = ref("")

function handleImageUpload(e: any) {
	const { file, fileLocation } = uploadImage(e)
	mainFileLocation.value = fileLocation || ""
	fileName.value = file?.name || ""
}

async function handleSubmit() {
	if (type === "CREATE") {
		const { _id } = await createBlog({
			title: title.value,
			source: source.value,
			tags: tags.value,
			mainFileLocation: mainFileLocation.value,
			fileName: fileName.value,
		})
		push(`/blog/${_id}/update`)
	} else if (type === "UPDATE") {
		await updateBlog({
			_id: id.toString(),
			title: title.value,
			source: source.value,
			tags: tags.value,
			mainFileLocation: mainFileLocation.value,
			fileName: fileName.value,
		})
    
	}
}
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 70px;
}

form {
	width: 90%;
	max-width: 500px;
	margin: auto;

	p {
		text-align: center;
		font-size: 1.6rem;
		margin-bottom: 20px;
	}

	input,
	.file-input-container {
		width: 100%;
		height: 50px;
		border-radius: 5px;
		margin-bottom: 40px;
		font-size: 1.2rem;
		padding: 5px 10px;
	}

	.main-blog-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		margin-bottom: 40px;
	}
	button {
		margin-bottom: 40px;
	}
}
</style>
../../../../app/stores/hooks/useUploadFile
