<template>
	<nav>
		<div class="left">
			<Button v-if="!user" @click="push('/login')">Zaloguj się</Button>
			<img
				v-else
				:src="user.fileLocation || ''"
				alt="zdjęcie profilowe"
				class="avatar"
				@error="setUser({ ...user, fileLocation: DEFAULT_AVATAR_IMAGE_URL })"
			/>
		</div>
		<div class="right">
			<div class="icon-container" @click="switchTheme()">
				<Icon v-if="theme.type === 'LIGHT'" icon="ph:sun-fill" />
				<Icon v-else icon="ph:moon-fill" />
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { Icon } from "@iconify/vue"
import { useAppStore } from "../app/stores/appStore"
import { DEFAULT_AVATAR_IMAGE_URL, SERVER_URL } from "../app/constants/urls.ts"
import Button from "./Button.vue"

const appState = useAppStore()
const { push } = useRouter()
const { switchTheme, setUser } = appState
const { user, theme } = storeToRefs(appState)
console.log(SERVER_URL)
</script>

<style lang="scss" scoped>
nav {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	padding: 10px 20px;
	height: 60px;
	color: v-bind("theme.colors.text");
	background-color: v-bind("theme.colors.darkMainBg");
	border-bottom: 2px solid
		v-bind("theme.type === 'DARK' ? theme.colors.main : '#050505'");
	display: flex;
	align-items: center;
	box-shadow: 0px 0px 1px 2px
		v-bind("theme.type === 'DARK' ? theme.colors.main : '#050505'");
	.left {
		display: flex;
		position: absolute;
		left: 30px;
		gap: 10px;
		.avatar {
			width: 50px;
			aspect-ratio: 1/1;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	.right {
		display: flex;
		position: absolute;
		right: 30px;
		gap: 10px;
		.icon-container {
			width: 35px;
			height: 35px;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			svg {
				color: v-bind("theme.colors.text");
				width: 90%;
				height: 90%;
			}
		}
	}
}
</style>
