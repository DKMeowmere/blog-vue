<template>
	<div class="w-full h-[50px] flex mb-10">
		<input
			type="text"
			v-model="tagInput"
			maxlength="20"
			class="!w-[70%] text-[1.2rem] py-1.5 px-2.5 rounded-l-lg text-blackText"
			data-cy="tag-input"
			placeholder="Dodaj tag..."
		/>
		<Button
			additional-styles="!w-[30%] mt-0 h-[50px] !rounded-r-lg !rounded-none"
			data-cy="add-tag-btn"
			@click="addTag"
			type="button"
		>
			Dodaj tag
		</Button>
	</div>
	<div class="w-full my-7 flex flex-wrap gap-4">
		<div
			v-for="tag in tags"
			class="group relative py-2.5 px-4 flex-grow-[1] rounded-[7px] text-[1.2rem] text-bold uppercase text-center cursor-pointer tracting-[1.5px] tag"
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
import { TAGS_HAVE_TO_BE_UNIQUE } from "../../../../app/constants/alerts"
import { useAppStore } from "../../../../app/stores/appStore"
import Button from "../../../../components/Button.vue"

type Props = {
	tags: string[]
	addTagCb: (value: string) => void
	removeTagCb: (value: string) => void
}

const appState = useAppStore()
const { enqueueAlert, theme } = appState
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

<style lang="scss">
.tag {
	color: v-bind("theme.colors.whiteText");
	background-color: v-bind("theme.colors.main");
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
</style>

<!-- 
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
</style> -->
