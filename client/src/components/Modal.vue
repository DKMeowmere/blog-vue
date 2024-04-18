<template>
	<teleport to="#modal">
		<div
			class="w-full h-[calc(100vh-64px)] top-[64px] left-0 fixed bg-[#000000bb] flex items-center justify-center"
		>
			<Icon
				icon="material-symbols:close"
				class="absolute bottom-[10px] text-whiteText w-[60px] h-[60px] cursor-pointer sm:top-[40px] sm:right-[10px] md:right-[30px]"
				data-cy="close-btn"
				@click="emit('close')"
			/>
			<div
				class="w-[90%] max-w-[800px] bg-white rouded-[20px] h-[calc(80vh-64px)] overflow-y-auto flex justify-center items-center flex-col relative g-[20px] sm-w-[80%] lg:max-w-[1000px] rounded-2xl"
				@click.stop
			>
				<slot> </slot>
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated } from "vue"
import { Icon } from "@iconify/vue"
const emit = defineEmits(["close"])

onMounted(() => {
	document.body.style.overflow = "hidden"
})

onUpdated(() => {
	document.body.style.overflow = "hidden"
})

onUnmounted(() => {
	document.body.style.overflow = "scroll"
})
</script>

<!-- <style scoped lang="scss">
@import "../app/style/_variables";

.modal-container {
	width: 100%;
	height: calc(100vh - 40px);
	top: 40px;
	left: 0;
	position: fixed;
	background-color: #000000bb;
	display: flex;
	justify-content: center;
	align-items: center;
	.close-btn {
		position: absolute;
		bottom: 10px;
		color: #fff;
		width: 60px;
		height: 60px;
		cursor: pointer;
	}
	.content {
		width: 90%;
		max-width: 800px;
		background-color: #fff;
		border-radius: 20px;
		height: calc(80vh - 40px);
		overflow-y: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
		gap: 20px;
	}

	@media screen and (min-width: $breakpoints-sm) {
		.content {
			width: 80%;
		}
		.close-btn {
			position: absolute;
			top: 40px;
			right: 10px;
		}
	}

	@media screen and (min-width: $breakpoints-md) {
		.close-btn {
			position: absolute;
			top: 40px;
			right: 30px;
		}
	}

	@media screen and (min-width: $breakpoints-lg) {
		.content {
			max-width: 1000px;
		}
	}
}
</style> -->
