<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { storeToRefs } from "pinia"
import { Icon } from "@iconify/vue"
import { useAppStore } from "../app/stores/appStore"

const appStore = useAppStore()
const { theme } = storeToRefs(appStore)

onMounted(() => {
	document.body.style.overflow = "hidden"
})

onUnmounted(() => {
	document.body.style.overflow = "scroll"
})
</script>

<template>
	<div class="loading-screen">
		<Icon icon="line-md:loading-loop" />
	</div>
</template>

<style scoped lang="scss">
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
</style>