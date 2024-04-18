<template>
	<h2
		class="text-[1.6rem] md:text-[2.4rem] text-bold mt-[50px] mb-2.5 mx-auto text-center"
	>
		{{ element.body }}
	</h2>
</template>

<script setup lang="ts">
import { SubtitleElementType } from "@backend/types/blog/subtitle"

type Props = {
	element: SubtitleElementType
}

const { element } = defineProps<Props>()
</script>

<!-- <style scoped lang="scss">
@import "../../../../app/style/variables";

h2 {
	font-size: 1.6rem;
	font-weight: bold;
	margin: 50px auto 10px;
	text-align: center;
}

@media screen and (min-width: $breakpoints-md) {
	h2 {
		font-size: 2.4rem;
	}
}
</style> -->
