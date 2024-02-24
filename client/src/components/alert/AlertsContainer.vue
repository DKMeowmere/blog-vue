<template>
	<teleport to="#alerts">
		<section class="alerts-container">
			<Alert v-for="alert in alertsQueue" :key="alert.id" :alert="alert" />
		</section>
	</teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "../../app/stores/appStore"
import Alert  from "./Alert.vue"

const appStore = useAppStore()
const { alertsQueue } = storeToRefs(appStore)
</script>

<style scoped lang="scss">
@import "../../app/style/_variables";

.alerts-container {
	position: fixed;
	width: 80%;
  max-width: 400px;
	left: 50%;
	translate: -50% 0;
	bottom: 20px;
	display: flex;
	flex-direction: column;
	gap: 30px;
}
@media screen and (min-width: $breakpoints-sm) {
	.alerts-container {
		left: 20px;
		translate: 0;
	}
}
</style>
