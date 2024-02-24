<template>
	<div
		:class="`alert alert-${type.toLowerCase()}`"
		data-cy="alert"
		@click="currentProgress = 0"
	>
		<Icon class="alert-icon" :icon="getIconName(type)" />
		<div class="countdown-bar" ref="countdownBarRef"></div>
		<p>
			{{ body }}
		</p>
		<Icon
			class="close-icon"
			data-cy="close-alert-icon"
			icon="material-symbols:close"
			@click="deleteAlert(id)"
		/>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { onMounted, ref } from "vue"
import { Icon } from "@iconify/vue/dist/iconify.js"
import { Alert, AlertTypes } from "@backend/types/client/alert"
import { useAppStore } from "../../app/stores/appStore"

const { alert } = defineProps<{ alert: Alert }>()
const appStore = useAppStore()
const { id, body, type } = alert
const { deleteAlert } = appStore
const { theme, alertLifeTime } = storeToRefs(appStore)
const currentProgress = ref(0)
const countdownBarRef = ref()

onMounted(() => {
	const step = alertLifeTime.value / 100

	const interval = setInterval(() => {
		if (
			!countdownBarRef.value ||
			currentProgress.value === alertLifeTime.value
		) {
			clearInterval(interval)
			deleteAlert(id)
			return
		}

		currentProgress.value += step
		countdownBarRef.value.style.width = `${
			(currentProgress.value * 100) / alertLifeTime.value
		}%`
	}, step)
})

function getIconName(type: AlertTypes) {
	if (type === "ERROR") return `material-symbols:error}`
	else if (type === "WARNING") return `material-symbols:warning}`
	else if (type === "SUCCESS") return `ep:success-filled`
	else return `material-symbols:info` //INFO
}
</script>

<style scoped lang="scss">
@import "../../app/style/_variables";

.alert {
	padding: 10px 30px 15px 40px;
	display: flex;
	align-items: center;
	z-index: 10000;
	width: 100%;
	position: relative;
	.countdown-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 5px;
		width: 0%;
	}
	p {
		text-align: justify;
	}
	.alert-icon {
		position: absolute;
		scale: 200%;
		left: 12px;
	}
	.close-icon {
		position: absolute;
		right: 7px;
		scale: 160%;
		cursor: pointer;
		font-weight: 700;
	}
	&:nth-child(n + 4) {
		display: none;
	}
}
.alert-error {
	background-color: v-bind("theme.colors.errorSecondary");
	color: v-bind("theme.colors.errorMain");
	border: 1px solid v-bind("theme.colors.errorMain");
	.close-icon {
		color: v-bind("theme.colors.errorMain");
	}
	.countdown-bar {
		background-color: v-bind("theme.colors.errorMain");
	}
}
.alert-warning {
	background-color: v-bind("theme.colors.warningSecondary");
	color: v-bind("theme.colors.warningMain");
	border: 1px solid v-bind("theme.colors.warningMain");
	.close-icon {
		color: v-bind("theme.colors.warningMain");
	}
	.countdown-bar {
		background-color: v-bind("theme.colors.warningMain");
	}
}
.alert-success {
	background-color: v-bind("theme.colors.successSecondary");
	color: v-bind("theme.colors.successMain");
	border: 1px solid v-bind("theme.colors.successMain");
	.close-icon {
		color: v-bind("theme.colors.successMain");
	}
	.countdown-bar {
		background-color: v-bind("theme.colors.successMain");
	}
}
.alert-info {
	background-color: v-bind("theme.colors.infoSecondary");
	color: v-bind("theme.colors.infoMain");
	border: 1px solid v-bind("theme.colors.infoMain");
	.close-icon {
		color: v-bind("theme.colors.infoMain");
	}
	.countdown-bar {
		background-color: v-bind("theme.colors.infoMain");
	}
}
</style>
