<template>
	<div class="file-input-container">
		<label
			:class="`${width || 'w-full'} ${
				maxWidth || 'max-w-full'
			} my-[15px] mx-auto block cursor-pointer text-center select-none p-2.5 ${
				bgColor || 'bg-lightMainBg-400 dark:bg-darkMainBg-400'
			} border-2 border-main shadow-[0px 0px 10px 2px] shadow-[#050505] dark:shadow-main hover:bg-main hover:rounded-[20px] hover:scale-105 text-blackText hover:shadow-[0px 0px 15px 5px] hover:shadow-main hover:text-whiteText ${
				additionalStyles || ''
			}`"
			:htmlFor="id"
			:data-cy="dataCy"
			>{{ text }}</label
		>
		<input class="hidden" :id="id" type="file" @change="changeCb" />
	</div>
</template>

<script setup lang="ts">
type Props = {
	text: string
	id: string
	dataCy: string
	changeCb: (e: Event) => void
	width?: string
	maxWidth?: string
	bgColor?: string
	additionalStyles?: string
}

const { text, id, changeCb, bgColor, maxWidth, width, dataCy } =
	defineProps<Props>()
</script>

<!-- <style scoped lang="scss">
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
			v-bind("theme.type === 'dark' ? theme.colors.main :'#050505'");
		&:hover {
			background-color: v-bind("theme.colors.main");
			border-radius: 20px;
			scale: 1.05;
			color: #f8f7f7;
			box-shadow: 0px 0px 15px 5px v-bind(" theme.colors.main");
		}
	}
}
</style> -->
