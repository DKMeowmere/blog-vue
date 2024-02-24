<template>
	<div class="file-input-container">
		<label :htmlFor="id" :data-cy="dataCy">{{ text }}</label>
		<input :id="id" type="file" @change="changeCb" />
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "../app/stores/appStore"

type Props = {
	text: string
	id: string
	dataCy: string
	changeCb: (e: Event) => void
	width?: string
	maxWidth?: string
	bgColor?: string
}

const { text, id, changeCb, bgColor, maxWidth, width, dataCy } =
	defineProps<Props>()
const appState = useAppStore()
const { theme } = storeToRefs(appState)
</script>

<style scoped lang="scss">
.file-input-container {
	input[type="file"] {
		display: none;
	}
	label {
    width: v-bind("width || '100%'");
		max-width: v-bind("maxWidth || '500px'");
		margin: 15px auto;
		display: block;
		cursor: pointer;
    text-align: center;
    user-select: none;
		padding: 10px;
		background: v-bind("bgColor ? bgColor : theme.colors.lightMainBg");
		border: 2px solid v-bind(" theme.colors.main");
		box-shadow: 0px 0px 10px 2px
			v-bind("theme.type === 'DARK' ? theme.colors.main :'#050505'");
		&:hover {
			background-color: v-bind("theme.colors.main");
			border-radius: 20px;
			scale: 1.05;
			color: #f8f7f7;
			box-shadow: 0px 0px 15px 5px v-bind(" theme.colors.main");
		}
	}
}
</style>
