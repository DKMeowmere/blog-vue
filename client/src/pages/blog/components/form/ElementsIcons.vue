<template>
	<draggable
		class="w-10 min-w-10 h-4/5 p-1.5 flex flex-col items-center gap-2 border-r-2 overflow-y-auto"
		v-model="elements"
		item-key="_id"
		@change="swapElements"
	>
		<template #item="{ element }">
			<div @click="updateSelectedElement(element)" data-="select-element">
				<Icon
					:icon="getIcon(element.type)"
					class="w-[25px] min-h-[25px] cursor-pointer md:w-w-[235px] md:min-h-[35px]"
				/>
			</div>
		</template>
	</draggable>
</template>
<script setup lang="ts">
import { ref } from "vue"
import draggable from "vuedraggable"
import { Icon } from "@iconify/vue"
import { BlogElement, BlogElementTypes } from "@backend/types/blog/blog"
import { useBlogElements } from "../../hooks/useBlogElements"

type Props = {
	blogId: string
	content: BlogElement[]
	updateContent: (content: BlogElement[]) => void
	updateSelectedElement: (element: BlogElement) => void
}

const { blogId, content, updateContent, updateSelectedElement } =
	defineProps<Props>()
const { updateContent: updateContentOnServer } = useBlogElements()
const elements = ref(content)

async function swapElements() {
	const newBlog = await updateContentOnServer({
		_id: blogId,
		content: elements.value,
	})
	updateContent(newBlog.content)
}

function getIcon(type: BlogElementTypes) {
	if (type === "TEXT") {
		return "mdi:text"
	}
	if (type === "IMAGE") {
		return "material-symbols:image"
	}
	if (type === "QUOTE") {
		return "bi:quote"
	}
	if (type === "SUBTITLE") {
		return "material-symbols:title"
	}
	if (type === "LIST") {
		return "material-symbols:list"
	}
	return ""
}
</script>

<!-- <style scoped lang="scss">
@import "../../../../app/style/variables";

.elements-icons {
	width: 10%;
	min-width: 40px;
	height: 80%;
	padding: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-right: 1px solid #000;
	overflow-y: auto;
	gap: 8px;
	.select-element-icon {
		width: 25px;
		min-height: 25px;
		cursor: pointer;
	}
}

@media screen and (min-width: $breakpoints-md) {
	.elements-icons {
		.select-element-icon {
			width: 35px;
			min-height: 35px;
		}
	}
}
</style> -->
