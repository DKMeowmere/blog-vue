<template>
	<teleport to="#modal">
		<div class="container" @click="$emit('close')">
			<Icon
				icon="material-symbols:close"
				class="close-btn"
				data-cy="close-btn"
			/>
			<div class="content" @click.stop>
				<slot> </slot>
			</div>
		</div>
	</teleport>
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

<style scoped lang="scss">
@import "../app/style/_variables";

.container {
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
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
		padding: 20px;
		border-radius: 20px;
		height: 80vh;
		overflow-y: scroll;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
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
</style>
