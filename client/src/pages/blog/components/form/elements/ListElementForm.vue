<template>
	<p class="title">Dodaj tytuł listy</p>
	<input
		type="text"
		v-model="title"
		data-cy="list-title-input"
		placeholder="Tytuł listy..."
		spellcheck="false"
		class="title-input"
	/>
	<Button @click="list.push({ _id: genereteUUID(), body: '', type: 'TEXT' })"
		>Dodaj element listy
	</Button>
	<div class="list-element" v-for="(element, index) in list" :key="element._id">
		<input
			type="text"
			v-model="list[index].body"
			:data-cy="`list-element-${element._id}-input`"
			placeholder="Podaj zawartość..."
			spellcheck="false"
			class="list-element-input"
		/>
		<Icon
			icon="mdi:close"
			@click="
				list = list.filter(listElement => element._id !== listElement._id)
			"
			class="remove-list-element-btn"
		/>
	</div>
	<Button @click="handleSubmit">Zatwierdź</Button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { ListElementType } from "@backend/types/blog/list"
import { TextElementType } from "@backend/types/blog/text"
import { BlogElement } from "@backend/types/blog/blog"
import { useBlogElements } from "../../../hooks/useBlogElements"
import Button from "../../../../../components/Button.vue"
import { Icon } from "@iconify/vue/dist/iconify.js"

type Props = {
	element: ListElementType
	updateContent: (content: BlogElement[]) => void
}

const { element, updateContent } = defineProps<Props>()
const { listElementServerAction } = useBlogElements()
const { params } = useRoute()
const { id } = params
const title = ref(element.title)
const list = ref<TextElementType[]>(element.listContent)

function genereteUUID() {
	return crypto.randomUUID()
}

async function handleSubmit() {
	const { content: newContent } = await listElementServerAction({
		blogId: id.toString(),
		elementId: element._id,
		title: title.value,
		listContent: list.value,
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
.title-input {
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
.list-element {
	width: 100%;
	display: flex;
	align-items: center;
	margin: 20px 0;
	height: 40px;
	.list-element-input {
    width:90%;
    height: 100%;
    padding: 5px 10px;
	}
	.remove-list-element-btn {
		width: 10%;
		aspect-ratio: 1/1;
    font-size: 2rem;
		cursor: pointer;
	}
}
</style>
