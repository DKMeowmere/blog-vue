<template>
	<p class="text-center text-[2rem] mb-[30px]">Podaj podtytuł</p>
	<input
		type="text"
		v-model="body"
		data-cy="subtitle-element-body-input"
		placeholder="Podtytuł..."
		spellcheck="false"
		class="w-full h-[50px] rounded-[5px] mb-2.5 text-[1.2rem] py-[5px] px-2.5 border"
	/>

	<Button
		@click="handleSubmit"
		data-cy="edit-subtitle-element-btn"
    height="h-12"
		additional-styles="mb-[30px]"
		>Edytuj</Button
	>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { SubtitleElementType } from "@backend/types/blog/subtitle"
import { BlogElement } from "@backend/types/blog/blog"
import { useBlogElements } from "../../../hooks/useBlogElements"
import Button from "../../../../../components/Button.vue"

type Props = {
	element: SubtitleElementType
	updateContent: (content: BlogElement[]) => void
}

const { element, updateContent } = defineProps<Props>()
const { subtitleElementServerAction } = useBlogElements()
const { params } = useRoute()
const { id } = params
const body = ref(element.body)

async function handleSubmit() {
	const { content: newContent } = await subtitleElementServerAction({
		blogId: id.toString(),
		elementId: element._id,
		body: body.value,
	})
	updateContent(newContent)
}
</script>

<!-- <style scoped lang="scss">
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
</style> -->
