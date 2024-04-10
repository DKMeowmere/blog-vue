<template>
	<Icon
		class="toggle-preview-mode-btn"
		:icon="isPreviewModeActive ? 'mdi:text-box-outline' : 'mdi:eye'"
		@click="isPreviewModeActive = !isPreviewModeActive"
	/>
	<p class="title">Podaj tekst</p>
	<div v-if="isPreviewModeActive" class="decorate-btns-container">
		<Icon
			@click="decorateText('BOLD')"
			icon="ooui:bold-b"
			class="decorate-btn"
		/>
		<Icon
			@click="decorateText('UNDERLINE')"
			icon="ri:underline"
			class="decorate-btn"
		/>
		<Icon
			@click="decorateText('STRIKE')"
			icon="ant-design:strikethrough-outlined"
			class="decorate-btn"
		/>
		<Icon
			@click="decorateText('ITALIC')"
			icon="mingcute:italic-fill"
			class="decorate-btn"
		/>
	</div>
	<textarea
		v-if="!isPreviewModeActive"
		v-model="body"
		spellcheck="false"
		data-cy="text-element-input"
	></textarea>
	<p
		v-else
		class="preview-text"
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
			<span class="highlighted-text"> <span v-text="middle"></span></span>
			<span v-text="end"></span
		></template>
	</p>
	<Button @click="handleSubmit" data-cy="edit-text-element-btn">Edytuj</Button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { Icon } from "@iconify/vue"
import { storeToRefs } from "pinia"
import { TextElementType } from "@backend/types/blog/text"
import { BlogElement } from "@backend/types/blog/blog"
import { useAppStore } from "../../../../../app/stores/appStore"
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
const appState = useAppStore()
const { theme } = storeToRefs(appState)
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

<style scoped lang="scss">
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
		cursor: pointer;
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
</style>
