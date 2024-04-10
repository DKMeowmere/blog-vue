<template>
	<FileInput
		:id="`blog-element-${id}`"
		data-cy="element-file-input"
		text="Dodaj zdjęcie"
		:change-cb="handleImageUpload"
		bg-color="#fff"
	/>
	<img
		:src="validateServerUrl(fileLocation) || DEFAULT_BLOG_IMAGE_URL"
		:alt="alt"
	/>
	<p class="title">Podaj opis obrazka</p>
	<input
		type="text"
		v-model="alt"
		data-cy="image-element-alt-input"
		placeholder="Opis obrazka..."
	/>
	<Button @click="handleSubmit" data-cy="edit-image-element-btn">Edytuj</Button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { ImageElementType } from "@backend/types/blog/image"
import { BlogElement } from "@backend/types/blog/blog"
import { DEFAULT_BLOG_IMAGE_URL } from "../../../../../app/constants/urls"
import { validateServerUrl } from "../../../../../app/utils/validateServerUrl"
import { useUploadFile } from "../../../../../app/hooks/useUploadFile"
import { useBlogElements } from "../../../hooks/useBlogElements"
import Button from "../../../../../components/Button.vue"
import FileInput from "../../../../../components/FileInput.vue"

type Props = {
	element: ImageElementType
	updateContent: (content: BlogElement[]) => void
}

const { element, updateContent } = defineProps<Props>()
const { imageElementServerAction } = useBlogElements()
const { uploadImage } = useUploadFile()
const { params } = useRoute()
const { id } = params
const alt = ref(element.alt || "")
const fileLocation = ref(element.fileLocation || "")
const fileName = ref("")

function handleImageUpload(e: any) {
	const { fileLocation: imageLocation, file } = uploadImage(e)

	fileLocation.value = imageLocation || ""
	fileName.value = file?.name || ""
}

async function handleSubmit() {
	const { content: newContent } = await imageElementServerAction({
		blogId: id.toString(),
		elementId: element._id,
		alt: alt.value,
		fileLocation: fileLocation.value,
		fileName: fileName.value,
	})
	updateContent(newContent)
}
</script>

<style scoped lang="scss">
.title {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 30px;
}
input {
	width: 100%;
	height: 50px;
	border-radius: 5px;
	margin-bottom: 10px;
	font-size: 1.2rem;
	padding: 5px 10px;
}
button {
	width: 100%;
	margin-top: 30px;
}
img {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	margin-bottom: 40px;
}
</style>
