<template>
	<Icon
		class="absolute left-[10%] top-[5px] cursor-pointer w-10 h-10 bg-main text-whiteText p-2 rounded-full hover:shadow-main hover:shadow-[0px_0px_15px_0px]"
		:icon="isPreviewModeActive ? 'mdi:text-box-outline' : 'mdi:eye'"
		@click="isPreviewModeActive = !isPreviewModeActive"
	/>
	<p class="text-center text-[2rem] mb-[30px]">Podaj tekst</p>
	<div
		v-if="isPreviewModeActive"
		class="w-full h-2/5 flex items-center justify-evenly my-4"
	>
		<Icon
			@click="decorateText('BOLD')"
			icon="ooui:bold-b"
			class="cursor-pointer w-10 h-10 bg-successMain text-whiteText p-2 rounded-full hover:shadow-successMain hover:shadow-[0px_0px_15px_0px]"
		/>
		<Icon
			@click="decorateText('UNDERLINE')"
			icon="ri:underline"
			class="cursor-pointer w-10 h-10 bg-successMain text-whiteText p-2 rounded-full hover:shadow-successMain hover:shadow-[0px_0px_15px_0px]"
		/>
		<Icon
			@click="decorateText('STRIKE')"
			icon="ant-design:strikethrough-outlined"
			class="cursor-pointer w-10 h-10 bg-successMain text-whiteText p-2 rounded-full hover:shadow-successMain hover:shadow-[0px_0px_15px_0px]"
		/>
		<Icon
			@click="decorateText('ITALIC')"
			icon="mingcute:italic-fill"
			class="cursor-pointer w-10 h-10 bg-successMain text-whiteText p-2 rounded-full hover:shadow-successMain hover:shadow-[0px_0px_15px_0px]"
		/>
	</div>
	<textarea
		v-if="!isPreviewModeActive"
		v-model="body"
		spellcheck="false"
		data-cy="text-element-input"
    placeholder="Podaj tekst..."
		class="w-full h-[65%] resize-none overflow-auto text-inherit p-1.5 border-[#ccc] border"
	></textarea>
	<p
		v-else
		class="w-full h-[65%] p-4 border-[#ccc] overflow-y-auto"
		@mousedown="onMousedown"
		@mouseup="getSelectedTextIndex"
		@mouseleave="getSelectedTextIndex"
		ref="previewText"
	>
		<template v-if="!isSelectionActive && !isTextHighligted"
			><span v-html="body"></span
		></template>
		<template v-else-if="isSelectionActive">
			<span v-text="body"></span>
		</template>
		<template v-else>
			<span v-text="start"></span>
			<span
				class="bg-[#0011ff] color-whiteText underline decoration-dotted decoration-whiteText"
			>
				<span v-text="middle"></span
			></span>
			<span v-text="end"></span
		></template>
	</p>
	<Button
		@click="handleSubmit"
		data-cy="edit-text-element-btn"
    height="h-12"
		additional-styles="mt-[30px]"
		>Edytuj</Button
	>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { Icon } from "@iconify/vue"
import { TextElementType } from "@backend/types/blog/text"
import { BlogElement } from "@backend/types/blog/blog"
import { useBlogElements } from "../../../hooks/useBlogElements"
import Button from "../../../../../components/Button.vue"

type Props = {
	element: TextElementType
	updateContent: (content: BlogElement[]) => void
}

const { element, updateContent } = defineProps<Props>()
const { params } = useRoute()
const { id } = params
const { textElementServerAction } = useBlogElements()
const body = ref(element.body)
const start = ref("")
const middle = ref("")
const end = ref("")
const previewText = ref<HTMLParagraphElement | null>(null)
const firstHighligtedCharIndex = ref(-1)
const lastHighligtedCharIndex = ref(-1)
const isTextHighligted = computed(
	() =>
		firstHighligtedCharIndex.value !== -1 &&
		lastHighligtedCharIndex.value !== -1
)
const isSelectionActive = ref(false)
const isPreviewModeActive = ref(false)

function onMousedown() {
	isSelectionActive.value = true
	resetHighlightedText()
}

function resetHighlightedText() {
	firstHighligtedCharIndex.value = -1
	lastHighligtedCharIndex.value = -1

	start.value = ""
	middle.value = ""
	end.value = ""
}

function getSelectedTextIndex() {
	const selection = getSelection()

	if (!selection) {
		return
	}

	if (selection.anchorOffset === selection.focusOffset) {
		return
	}
	isSelectionActive.value = false

	firstHighligtedCharIndex.value = Math.min(
		selection.anchorOffset,
		selection.focusOffset
	)
	lastHighligtedCharIndex.value = Math.max(
		selection.anchorOffset,
		selection.focusOffset
	)
	start.value = body.value.slice(0, firstHighligtedCharIndex.value)
	middle.value = body.value.slice(
		firstHighligtedCharIndex.value,
		lastHighligtedCharIndex.value
	)
	end.value = body.value.slice(lastHighligtedCharIndex.value)
	selection.empty()
}

function decorateText(type: "BOLD" | "UNDERLINE" | "ITALIC" | "STRIKE") {
	if (!isTextHighligted.value) {
		return
	}

	if (type === "BOLD") {
		body.value = `${start.value}<b>${middle.value}</b>${end.value}`
	} else if (type === "UNDERLINE") {
		body.value = `${start.value}<u>${middle.value}</u>${end.value}`
	} else if (type === "ITALIC") {
		body.value = `${start.value}<i>${middle.value}</i>${end.value}`
	} else if (type === "STRIKE") {
		body.value = `${start.value}<s>${middle.value}</s>${end.value}`
	}
	resetHighlightedText()
}

async function handleSubmit() {
	const { content: newContent } = await textElementServerAction({
		blogId: id.toString(),
		body: body.value,
		elementId: element._id,
	})
	updateContent(newContent)
}
</script>

<!-- <style scoped lang="scss">
@import "../../../../../app/style/_variables.scss";

.toggle-preview-mode-btn {
	position: absolute;
	left: 10%;
	top: 5px;
	cursor: pointer;
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
.title {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 30px;
}
textarea {
	width: 100%;
	height: 65%;
	resize: none;
	overflow-y: auto;
	font-family: inherit;
	padding: 5px;
	border: 1px solid #ccc;
}
.decorate-btns-container {
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 15px 0;
	.decorate-btn {
		width: 40px;
		height: 40px;
		background-color: v-bind("theme.colors.successMain");
		color: v-bind("theme.colors.whiteText");
		padding: 8px;
		border-radius: 50%;
		cursor: pointer;
		&:hover {
			box-shadow: 0px 0px 15px 0px v-bind("theme.colors.successMain");
		}
	}
}
.preview-text {
	width: 100%;
	height: 65%;
	padding: 15px;
	border: 1px solid #ccc;
	overflow-y: auto;
	.highlighted-text {
		background-color: #0011ff;
		color: v-bind("theme.colors.whiteText");
		text-decoration: underline dotted v-bind("theme.colors.whiteText");
	}
}
button {
	width: 100%;
	margin-top: 30px;
}
</style> -->
