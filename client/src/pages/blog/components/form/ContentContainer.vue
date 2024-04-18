<template>
	<section class="w-full h-full flex flex-row flex-wrap">
		<header
			class="w-full h-[10%] border-black mx-5 mt-2.5 flex items-center justify-center gap-5 mb-4"
		>
			<Icon
				class="w-10 h-10 bg-main text-whiteText p-2 rounded-full cursor-pointer hover:shadow-main hover:shadow-[0px_0px_15px_0px]"
				data-cy="add-text-element-btn"
				:icon="getIcon('TEXT')"
				@click="addElement('TEXT')"
			/>
			<Icon
				class="w-10 h-10 bg-main text-whiteText p-2 rounded-full cursor-pointer hover:shadow-main hover:shadow-[0px_0px_15px_0px]"
				data-cy="add-image-element-btn"
				:icon="getIcon('IMAGE')"
				@click="addElement('IMAGE')"
			/>
			<Icon
				class="w-10 h-10 bg-main text-whiteText p-2 rounded-full cursor-pointer hover:shadow-main hover:shadow-[0px_0px_15px_0px]"
				data-cy="add-quote-element-btn"
				:icon="getIcon('QUOTE')"
				@click="addElement('QUOTE')"
			/>
			<Icon
				class="w-10 h-10 bg-main text-whiteText p-2 rounded-full cursor-pointer hover:shadow-main hover:shadow-[0px_0px_15px_0px]"
				data-cy="add-subtitle-element-btn"
				:icon="getIcon('SUBTITLE')"
				@click="addElement('SUBTITLE')"
			/>
			<Icon
				class="w-10 h-10 bg-main text-whiteText p-2 rounded-full cursor-pointer hover:shadow-main hover:shadow-[0px_0px_15px_0px]"
				data-cy="add-list-element-btn"
				:icon="getIcon('LIST')"
				@click="addElement('LIST')"
			/>
		</header>
		<ElementsIcons
			:blog-id="blogId"
			:content="content"
			:key="content.length"
			:update-content="updateContent"
			:update-selected-element="element => (selectedElement = element)"
		/>
		<div
			v-if="selectedElement"
			class="w-[calc(90%-40px)] h-4/5 pt-9 pb-1.5 px-5 overflow-y-auto relative"
			:key="selectedElement._id"
		>
			<Icon
				icon="mdi:trash-can"
				@click="deleteElement"
				class="absolute right-[10%] top-[5px] w-10 h-10 bg-errorMain text-whiteText p-2 rounded-full hover:shadow-errorMain hover:shadow-[0px_0p_15px_0px] cursor-pointer"
				data-cy="delete-element-btn"
			/>
			<TextElementForm
				v-if="selectedElement.type === 'TEXT'"
				:element="selectedElement"
				:update-content="updateContent"
			/>
			<ImageElementForm
				v-else-if="selectedElement.type === 'IMAGE'"
				:element="selectedElement"
				:update-content="updateContent"
			/>
			<QuoteElementForm
				v-else-if="selectedElement.type === 'QUOTE'"
				:element="selectedElement"
				:update-content="updateContent"
			/>
			<SubtitleElementForm
				v-else-if="selectedElement.type === 'SUBTITLE'"
				:element="selectedElement"
				:update-content="updateContent"
			/>
			<ListElementForm
				v-else-if="selectedElement.type === 'LIST'"
				:element="selectedElement"
				:update-content="updateContent"
			/>
		</div>
		<div
			v-else
			class="w-[calc(90%-40px)] h-4/5 pt-6 px-5 mb-1.5 flex flex-col justify-center items-center gap-7"
		>
			<Icon
				icon="lets-icons:blank-fill"
				class="block text-[6rem] aspect-square text-[#9e9e9e]"
			/>
			<p class="text-[2rem] text-center text-[#9e9e9e]">
				Nic tu nie ma. Dodaj element
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ref } from "vue"
import { BlogElement, BlogElementTypes } from "@backend/types/blog/blog"
import { useBlogElements } from "../../hooks/useBlogElements"
import ElementsIcons from "./ElementsIcons.vue"
import TextElementForm from "./elements/TextElementForm.vue"
import ImageElementForm from "./elements/ImageElementForm.vue"
import QuoteElementForm from "./elements/QuoteElementForm.vue"
import SubtitleElementForm from "./elements/SubtitleElementForm.vue"
import ListElementForm from "./elements/ListElementForm.vue"

type Props = {
	blogId: string
	content: BlogElement[]
	updateContent: (content: BlogElement[]) => void
}

const { blogId, content, updateContent } = defineProps<Props>()
const {
	textElementServerAction,
	imageElementServerAction,
	quoteElementServerAction,
	subtitleElementServerAction,
	listElementServerAction,
	deleteBlogElement,
} = useBlogElements()
const selectedElement = ref(content[0] || null)

function getIcon(type: BlogElementTypes) {
	if (type === "TEXT") {
		return "mdi:text"
	}
	if (type === "IMAGE") {
		return "material-symbols:image"
	}
	if (type === "QUOTE") {
		return "bi:quote"
	}
	if (type === "SUBTITLE") {
		return "material-symbols:title"
	}
	if (type === "LIST") {
		return "material-symbols:list"
	}
	return ""
}

async function addElement(type: BlogElementTypes) {
	if (type === "TEXT") {
		const newBlog = await textElementServerAction({
			blogId,
			body: "",
		})
		updateContent(newBlog.content)
		selectedElement.value = newBlog.content.at(-1) || null
	} else if (type === "IMAGE") {
		const newBlog = await imageElementServerAction({
			blogId,
			alt: "",
			fileLocation: "",
			fileName: "",
		})
		selectedElement.value = newBlog.content.at(-1) || null
		updateContent(newBlog.content)
	} else if (type === "QUOTE") {
		const newBlog = await quoteElementServerAction({
			blogId,
			author: "",
			body: "",
		})
		updateContent(newBlog.content)
		selectedElement.value = newBlog.content.at(-1) || null
	} else if (type === "SUBTITLE") {
		const newBlog = await subtitleElementServerAction({
			blogId,
			body: "",
		})
		updateContent(newBlog.content)
		selectedElement.value = newBlog.content.at(-1) || null
	} else if (type === "LIST") {
		const newBlog = await listElementServerAction({
			blogId,
			title: "",
			listContent: [],
		})
		updateContent(newBlog.content)
		selectedElement.value = newBlog.content.at(-1) || null
	}
}

async function deleteElement() {
	const { content: newContent } = await deleteBlogElement(
		blogId,
		selectedElement.value._id
	)
	updateContent(newContent)
	selectedElement.value = content[0] || null
}
</script>

<!-- <style scoped lang="scss">
@import "../../../../app/style/variables";

.elements-form-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: row wrap;
	.add-element-btn-container {
		width: 100%;
		height: 10%;
		border-bottom: 1px solid #000;
		margin: 0 20px 10px 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		.add-element-btn {
			width: 40px;
			height: 40px;
			background-color: v-bind("theme.colors.main");
			color: v-bind("theme.colors.whiteText");
			padding: 8px;
			border-radius: 50%;
			cursor: pointer;
			&:hover {
				box-shadow: 0px 0px 15px 0px v-bind("theme.colors.main");
			}
		}
	}
	.blog-element {
		width: calc(90% - 40px);
		height: 80%;
		padding: 35px 20px 5px 20px;
		overflow-y: auto;
		position: relative;
		.delete-element-btn {
			position: absolute;
			right: 10%;
			top: 5px;
			width: 40px;
			height: 40px;
			background-color: v-bind("theme.colors.errorMain");
			color: v-bind("theme.colors.whiteText");
			padding: 8px;
			border-radius: 50%;
			cursor: pointer;
			&:hover {
				box-shadow: 0px 0px 15px 0px v-bind("theme.colors.errorMain");
			}
		}
	}
	.content-is-empty-card {
		width: calc(90% - 40px);
		height: 80%;
		padding: 25px 20px 5px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 30px;
		.content-is-empty-icon {
			display: block;
			font-size: 6rem;
			aspect-ratio: 1 / 1;
			color: #9e9e9e;
		}
		p {
			font-size: 2rem;
			color: #9e9e9e;
			text-align: center;
		}
	}
}
</style> -->
