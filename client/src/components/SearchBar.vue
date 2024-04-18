<template>
	<div
		:class="`${width} ${height} ${
			maxWidth || 'max-w-full'
		} my-5 relative mx-auto`"
	>
		<input
			type="text"
			placeholder="Wyszukaj..."
			:class="`${height} w-full pl-7 overflow-visible text-blackText ${
				additionalInputStyles || ''
			}`"
			:data-cy="inputDataCy || ''"
			:value="modelValue"
			@input="updateValue"
		/>
		<Icon
			icon="material-symbols:search"
			:class="`absolute top-1/2 text-blackText translate-y-[-50%] left-[5px] w-6 h-6`"
		/>
		<div
			v-if="isAutocompleteVisible"
			class="w-full max-h-[300px] rounded-[5px] overflow-y-auto bg-darkMainBg-500 dark:bg-lightMainBg-500 text-whiteText dark:text-blackText"
		>
			<div
				v-for="item in autocompleteData"
				:class="`w-full ${height} py-2.5 px-5 border-blackText cursor-pointer hover:text-whiteText hover:bg-main`"
				:key="item._id"
				@click="selectValue(item.value)"
			>
				{{ item.value }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Icon } from "@iconify/vue"

type Props = {
	width: string
	maxWidth?: string
	height: string
	modelValue: string
	autocompleteData: { _id: string; value: string }[]
	additionalInputStyles?: string
	inputDataCy?: string
}

const {
	width,
	maxWidth,
	height,
	additionalInputStyles,
	inputDataCy,
	modelValue,
} = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])
const isAutocompleteVisible = ref(false)

function updateValue(e: Event) {
	isAutocompleteVisible.value = true
	emit("update:modelValue", (e.target as HTMLInputElement).value)
}

function selectValue(value: string) {
	isAutocompleteVisible.value = false
	emit("update:modelValue", value)
}
</script>
<!-- 
<style scoped>
.search-bar {
	width: v-bind("width");
	max-width: v-bind("maxWidth || '100%'");
	margin: 20px auto;
	height: v-bind("height");
	overflow: visible;
	position: relative;
	input {
		width: 100%;
		height: v-bind("height");
		padding-left: 35px;
	}
	.search-icon {
		position: absolute;
		top: calc(v-bind("height") / 2);
		color: v-bind("theme.colors.blackText");
		translate: 0 -50%;
		width: 25px;
		height: 25px;
		left: 5px;
	}
	.autocomplete-container {
		width: 100%;
		max-height: 300px;
		overflow-y: auto;
		border-radius: 5px;
		position: relative;
		z-index: 100000;
		background-color: v-bind("theme.colors.contrastMainBg");
		color: v-bind("theme.colors.contrastText");
		.item {
			width: 100%;
			height: v-bind("height");
			padding: 10px 20px;
			border: 1px solid v-bind("theme.colors.blackText");
			cursor: pointer;
			&:hover {
				color: v-bind("theme.colors.whiteText");
				background-color: v-bind("theme.colors.main");
			}
		}
	}
}
</style> -->
