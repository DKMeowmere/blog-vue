<template>
	<blockquote>
		<q>
			{{ element.body }}
		</q>
		<span class="author">{{ element.author }}</span>
	</blockquote>
</template>

<script setup lang="ts">
import { QuoteElementType } from "@backend/types/blog/quote"
import { useAppStore } from "../../../../app/stores/appStore"
import { storeToRefs } from "pinia"

type Props = {
	element: QuoteElementType
}

const { element } = defineProps<Props>()
const appState = useAppStore()
const { theme } = storeToRefs(appState)
</script>

<style scoped lang="scss">
@import "../../../../app/style/variables";

blockquote {
	width: 90%;
	max-width: 600px;
	position: relative;
	margin: 30px 0;
	padding: 20px 10px v-bind("element.author ? '50px' :'20px'");
	border-top: 1px solid v-bind("theme.colors.text");
	border-bottom: 1px solid v-bind("theme.colors.text");
	font-size: 1.1rem;
	font-style: italic;
	.author {
		position: absolute;
		bottom: 5px;
		right: 8px;
	}
}

@media screen and (min-width: $breakpoints-md) {
	blockquote {
		font-size: 1.5rem;
		margin: auto;
	}
}
</style>
