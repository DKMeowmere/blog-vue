<template>
	<img
		:alt="element.alt"
		:src="validateServerUrl(element.fileLocation) || DEFAULT_BLOG_IMAGE_URL"
	/>
</template>

<script setup lang="ts">
import { ImageElementType } from "@backend/types/blog/image"
import { DEFAULT_BLOG_IMAGE_URL } from "../../../../app/constants/urls"
import { validateServerUrl } from "../../../../app/utils/validateServerUrl"

type Props = {
	element: ImageElementType
}

const { element } = defineProps<Props>()
</script>

<style scoped lang="scss">
@import "../../../../app/style/variables";

img {
	width: 70%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	margin: 20px auto;
}
</style>
