<template>
	<div class="password-input-container">
		<Icon
			:icon="isPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'"
			@click="isPasswordVisible = !isPasswordVisible"
			class="eye-icon"
		/>
		<input
			v-bind="$attrs"
			:type="isPasswordVisible ? 'text' : 'password'"
			:value="modelValue"
			@input="updateValue"
			:data-cy="dataCy"
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

<style scoped lang="scss">
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
		transform: translateY(-50%);
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
</style>
