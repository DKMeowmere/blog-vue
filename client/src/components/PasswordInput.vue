<template>
	<div class="relative mb-[40px]">
		<Icon
			:icon="isPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'"
			@click="isPasswordVisible = !isPasswordVisible"
			class="absolute top-[50%] right-[10px] w-[30px] h-[30px] translate-y-[-50%] cursor-pointer text-[#111]"
		/>
		<input
			v-bind="$attrs"
			:type="isPasswordVisible ? 'text' : 'password'"
			:value="modelValue"
			@input="updateValue"
      placeholder="Wprowadź hasło..."
			:data-cy="dataCy"
			:class="`${width || 'w-full'} ${
				height || 'h-[50px]'
			} text-[1.2rem] text-blackText font-mono rounded-[5px] py-[5px] pl-[10px] pr-[20%] sm-pr-[16%] md-pr-[12%]`"
		/>
	</div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { ref } from "vue"

type Props = {
	modelValue: string
	width?: string
	height?: string
	dataCy?: string
}

defineOptions({
	inheritAttrs: false,
})

const { width, height, modelValue, dataCy } = defineProps<Props>()
const isPasswordVisible = ref(false)
const emit = defineEmits(["update:modelValue"])

function updateValue(e: Event) {
	emit("update:modelValue", (e.target as HTMLInputElement).value)
}
</script>

<!-- <style scoped lang="scss">
@import "../app/style/_variables";

.password-input-container {
	position: relative;
	margin-bottom: 40px;
	.eye-icon {
		position: absolute;
		width: 30px;
		height: 30px;
		right: 10px;
		top: 50%;
		translate: 0 -50%;
		cursor: pointer;
		color: #111;
	}
	input {
		width: v-bind("width || '100%'");
		height: v-bind("height || '50px'");
		padding: 5px 20% 5px 10px;
		font-size: inherit;
		border-radius: 5px;
	}
}
@media screen and (min-width: $breakpoints-sm) {
	.password-input-container {
		input {
			padding: 5px 16% 5px 10px;
		}
	}
}
@media screen and (min-width: $breakpoints-md) {
	.password-input-container {
		input {
			padding: 5px 12% 5px 10px;
		}
	}
}
</style> -->
