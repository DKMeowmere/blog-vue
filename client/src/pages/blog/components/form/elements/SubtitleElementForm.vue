<template>
	<p class="title">Podaj podtytuł</p>
	<input
		type="text"
		v-model="body"
		data-cy="subtitle-input"
		placeholder="Podtytuł..."
		spellcheck="false"
	/>

	<Button @click="handleSubmit">Edytuj</Button>
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
</style>
