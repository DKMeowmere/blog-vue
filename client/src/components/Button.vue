<template>
	<button
		:type="type || 'button'"
		:class="`${width || 'w-full'} ${maxWidth || 'max-w-full'} ${
			height || 'h-full'
		}  ${bgColor || 'bg-main'}  ${
			disabled ? 'cursor-not-allowed' : 'cursor-pointer'
		} ${
			textColor || 'text-whiteText'
		}  py-4 px-2.5 uppercase tracking-wider font-bold border-0 rounded-xl flex items-center justify-center my-0 mx-auto hover:shadow-2xl hover:ring ${
			additionalStyles || ''
		}`"
	>
		<slot> </slot>
	</button>
</template>

<script setup lang="ts">
type Props = {
	width?: string
	maxWidth?: string
	height?: string
	additionalStyles?: string
	type?: "button" | "submit" | "reset"
	bgColor?: string
	textColor?: string
	disabled?: boolean
}

const { width, maxWidth, height, bgColor, textColor, disabled } =
	defineProps<Props>()
</script>

<!-- <style lang="scss" scoped>
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
</style> -->
