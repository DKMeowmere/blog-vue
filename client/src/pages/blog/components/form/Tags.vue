<template>
	<div class="input-container">
		<input
			type="text"
			v-model="tagInput"
			maxlength="20"
			class="tag-input"
			data-cy="tag-input"
			placeholder="Dodaj tag..."
		/>
		<Button
			class="add-tag-btn"
			data-cy="add-tag-btn"
			@click="addTag"
			type="button"
		>
			Dodaj tag
		</Button>
	</div>
	<div class="tags-container">
		<div
			v-for="tag in tags"
			class="tag"
			data-cy="tag"
			:key="tag"
			@click="() => removeTagCb(tag)"
		>
			{{ tag }}
			<Icon icon="material-symbols:close" class="icon" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Icon } from "@iconify/vue"
import { storeToRefs } from "pinia"
import { TAGS_HAVE_TO_BE_UNIQUE } from "../../../../app/constants/alerts"
import { useAppStore } from "../../../../app/stores/appStore"
import Button from "../../../../components/Button.vue"

type Props = {
	tags: string[]
	addTagCb: (value: string) => void
	removeTagCb: (value: string) => void
}

const appState = useAppStore()
const { enqueueAlert } = appState
const { theme } = storeToRefs(appState)
const { tags, addTagCb, removeTagCb } = defineProps<Props>()
const tagInput = ref("")

function addTag() {
	if (!tagInput.value) {
		return
	}

	if (tags.includes(tagInput.value)) {
		enqueueAlert(TAGS_HAVE_TO_BE_UNIQUE)
		return
	}

	addTagCb(tagInput.value)
	tagInput.value = ""
}
</script>

<style scoped>
.input-container {
	width: 100%;
	height: 50px;
	display: flex;
}

.tag-input {
	width: 70%;
	height: 50px;
	margin-bottom: 40px;
	font-size: 1.2rem;
	padding: 5px 10px;
	border-radius: 5px 0 0 5px;
}

button {
	width: 100%;
	height: 60px;
	margin-top: 30px;
}

.add-tag-btn {
	width: 30%;
	margin-top: 0;
	height: 50px;
	border-radius: 0 5px 5px 0;
}

.tags-container {
	width: 100%;
	margin: 30px 0;
	display: flex;
	flex-flow: row wrap;
	gap: 15px;

	.tag {
		position: relative;
		padding: 10px 15px;
		color: v-bind("theme.colors.whiteText");
		background-color: v-bind("theme.colors.main");
		flex-grow: 1;
		border-radius: 7px;
		font-size: 1.2rem;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 1.5px;
		cursor: pointer;
		.icon {
			visibility: hidden;
			position: absolute;
			width: 30px;
			height: 30px;
			top: 50%;
			left: 50%;
			translate: -50% -50%;
			color: v-bind("theme.colors.main");
		}
		&:hover {
			color: v-bind("theme.colors.main");
			.icon {
				color: v-bind("theme.colors.whiteText");
				visibility: visible;
			}
		}
	}
}
</style>
../../../../app/constants/alerts../../../../app/stores/appStore
