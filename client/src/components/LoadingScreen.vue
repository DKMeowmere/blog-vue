<template>
	<div
		class="w-full h-screen fixed top-0 left-0 bg-black opacity-70 z-50 flex justify-center items-center"
	>
		<Icon
			icon="line-md:loading-loop"
			class="w-[150px] h-[150px] text-whiteText"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { Icon } from "@iconify/vue"

onMounted(() => {
	document.body.style.overflow = "hidden"
})

onUnmounted(() => {
	document.body.style.overflow = "scroll"
})
</script>

<!-- <style scoped lang="scss">
.loading-screen {
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #000000bb;
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 150px;
		height: 150px;
		color: v-bind("theme.colors.whiteText");
	}
}
</style> -->
