<template>
	<img
		:alt="alt"
		:src="validateServerUrl(url) || DEFAULT_AVATAR_IMAGE_URL"
		@error="url = DEFAULT_AVATAR_IMAGE_URL"
		:class="`${width || 'w-full'} ${maxWidth || 'max-w-full'} aspect-square rounded-full object-cover ${additionalStyles || ''}`"
	/>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { DEFAULT_AVATAR_IMAGE_URL } from "../app/constants/urls"
import { validateServerUrl } from "../app/utils/validateServerUrl"

type Props = {
	width?: string
	maxWidth?: string
	additionalStyles?: string
	src: string
	alt: string
}

const props = defineProps<Props>()
const { maxWidth, width, src, alt, additionalStyles } = props
const url = ref(src)

watch(
	() => props.src,
	newSrc => {
		url.value = newSrc
	}
)
</script>
<!-- 
<style scoped lang="scss">
img {
	width: v-bind("width || '100%'");
	max-width: v-bind("maxWidth || '100%'");
	aspect-ratio: 1/1;
	border-radius: 50%;
	object-fit: cover;
}
</style> -->
