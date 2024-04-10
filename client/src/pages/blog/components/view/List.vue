<template>
	<figure>
		<figcaption v-if="element.title">{{ element.title }}</figcaption>
		<ul>
			<li v-for="text in element.listContent" :key="text._id">
				{{ text.body }}
			</li>
		</ul>
	</figure>
</template>

<script setup lang="ts">
import { ListElementType } from "@backend/types/blog/list"

type Props = {
	element: ListElementType
}

const { element } = defineProps<Props>()
</script>

<style scoped lang="scss">
@import "../../../../app/style/variables";

figure {
	padding: 5px;
	align-self: left;
	figcaption {
		font-size: 1.5rem;
		text-align: center;
	}
	ul {
		margin-left: 20px;
		li {
			list-style-type: disc;
			font-size: 1.2rem;
		}
	}
}

@media screen and (min-width: $breakpoints-md) {
	figure {
		figcaption {
			font-size: 1.9rem;
		}
		ul {
			li {
				font-size: 1.5rem;
			}
		}
	}
}
</style>
