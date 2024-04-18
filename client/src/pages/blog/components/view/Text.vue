<template>
	<p v-html="text" class="my-2.5 text-[1.2rem] md:text-[1.5rem]"></p>
</template>

<script setup lang="ts">
import { TextElementType } from "@backend/types/blog/text"
import { ref } from "vue"

type Props = {
	element: TextElementType
}

const { element } = defineProps<Props>()
const text = ref(element.body)

validateText()
function validateText() {
	text.value = text.value.replaceAll("<", "&lt;")
	text.value = text.value.replaceAll(">", "&gt;")
	text.value = text.value.replaceAll("&lt;b&gt;", "<b>")
	text.value = text.value.replaceAll("&lt;/b&gt;", "</b>")
	text.value = text.value.replaceAll("&lt;u&gt;", "<u>")
	text.value = text.value.replaceAll("&lt;/u&gt;", "</u>")
	text.value = text.value.replaceAll("&lt;s&gt;", "<s>")
	text.value = text.value.replaceAll("&lt;/s&gt;", "</s>")
	text.value = text.value.replaceAll("&lt;i&gt;", "<i>")
	text.value = text.value.replaceAll("&lt;/i&gt;", "</i>")
	text.value = text.value.replaceAll("&lt;q&gt;", "<q>")
	text.value = text.value.replaceAll("&lt;/q&gt;", "</q>")
}
</script>

<!-- <style scoped lang="scss">
@import "../../../../app/style/variables";

p {
	font-size: 1.2rem;
	margin: 10px 0;
}

@media screen and (min-width: $breakpoints-md) {
	p {
		font-size: 1.5rem;
	}
}
</style> -->
