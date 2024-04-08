<template>
	<button :type="type || 'button'">
		<slot> </slot>
	</button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "../app/stores/appStore"

type Props = {
	width?: string
	maxWidth?: string
	height?: string
	type?: "button" | "submit" | "reset"
	bgColor?: string
	textColor?: string
	onlyIcon?: boolean
	disabled?: boolean
}

const { width, maxWidth, height, bgColor, onlyIcon, textColor, disabled } =
	defineProps<Props>()
const appStore = useAppStore()
const { theme } = storeToRefs(appStore)
</script>

<style lang="scss" scoped>
button {
	width: v-bind("width || 'auto'");
	max-width: v-bind("maxWidth || 'auto'");
	height: v-bind("height || 'auto'");
	background-color: v-bind("bgColor || theme.colors.main");
	color: v-bind("textColor || theme.colors.whiteText");
	padding: 15px 10px;
	cursor: v-bind("disabled ? 'not-allowed' : 'pointer'");
	text-transform: uppercase;
	letter-spacing: 1.6px;
	font-weight: bold;
	border: none;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	&:hover {
		box-shadow: 0px 0px 25px 0px
			v-bind("disabled ? 'none' : (bgColor || theme.colors.main)");
	}
	svg {
		width: 25px;
		height: 25px;
		margin-right: v-bind("onlyIcon ? '0px' : '12px'");
	}
}
</style>
