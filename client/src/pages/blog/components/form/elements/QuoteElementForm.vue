<template>
	<p class="text-center text-[2rem] mb-[30px]">Podaj cytat</p>
	<textarea
		type="text"
		class="w-full h-[150px] resize-none overflow-y-auto text-inherit py-1.5 px-2.5 border"
		v-model="body"
		data-cy="quote-element-body-input"
		placeholder="Cytat..."
		spellcheck="false"
	/>
	<p class="text-center text-[2rem] mb-[30px]">Podaj autora</p>
	<input
		type="text"
		v-model="author"
		data-cy="quote-element-author-input"
		placeholder="Autor..."
		spellcheck="false"
		class="w-full h-50px border rounded-[5px] test-[1.2rem] mb-2.5 py-1.5 px-2.5"
	/>
	<Button
		@click="handleSubmit"
		data-cy="edit-quote-element-btn"
		height="h-12"
		additional-styles="mt-[30px]"
		>Edytuj</Button
	>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { QuoteElementType } from "@backend/types/blog/quote"
import { BlogElement } from "@backend/types/blog/blog"
import { useBlogElements } from "../../../hooks/useBlogElements"
import Button from "../../../../../components/Button.vue"

type Props = {
	element: QuoteElementType
	updateContent: (content: BlogElement[]) => void
}

const { element, updateContent } = defineProps<Props>()
const { quoteElementServerAction } = useBlogElements()
const { params } = useRoute()
const { id } = params
const body = ref(element.body)
const author = ref(element.author)

async function handleSubmit() {
	const { content: newContent } = await quoteElementServerAction({
		blogId: id.toString(),
		elementId: element._id,
		body: body.value,
		author: author.value,
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
textarea {
	width: 100%;
	height: 150px;
	resize: none;
	overflow-y: auto;
	padding: 5px 10px;
	font-family: inherit;
}
button {
	width: 100%;
	margin-top: 30px;
}
</style> -->
