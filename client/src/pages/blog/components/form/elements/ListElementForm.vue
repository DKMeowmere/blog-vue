<template>
	<p class="text-center text-[2rem] mb-[30px]">Dodaj tytuł listy</p>
	<input
		type="text"
		v-model="title"
		data-cy="list-element-title-input"
		placeholder="Tytuł listy..."
		spellcheck="false"
		class="w-full h-[50px] mb-2.5 rounded-[5px] text-[1.2rem] py-1.5 px-2.5 border"
	/>
	<Button
		data-cy="add-list-item"
		@click="list.push({ _id: genereteUUID(), body: '', type: 'TEXT' })"
		additional-styles="mt-[30px] h-[50px]"
		>Dodaj element listy
	</Button>
	<div
		class="w-full flex items-center my-5 text-[1.2rem] h-[40px]"
		v-for="(element, index) in list"
		:key="element._id"
	>
		<input
			type="text"
			v-model="list[index].body"
			data-cy="list-item-input"
			placeholder="Podaj zawartość..."
			spellcheck="false"
			class="w-[90%] h-full py-1.5 px-2.5 border"
		/>
		<Icon
			icon="mdi:close"
			@click="
				list = list.filter(listElement => element._id !== listElement._id)
			"
			class="w-[10%] aspect-square cursor-pointer text-[2rem] hover:text-errorMain"
		/>
	</div>
	<Button @click="handleSubmit" data-cy="edit-list-element-btn" additional-styles="h-12">
		Zatwierdź
	</Button>
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

<!-- <style scoped lang="scss">
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
		width: 90%;
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
</style> -->
