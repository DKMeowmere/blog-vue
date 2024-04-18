<template>
	<nav
		class="fixed top-0 right-0 z-40 w-full py-2.5 px-5 h-16 text-lightMainBg-500 dark:text-darkMainBg-500 bg-lightMainBg-600 dark:bg-darkMainBg-600 border-b-4 border-black dark:border-main flex items-center"
	>
		<div class="flex absolute left-7 gap-2.5">
			<Button
				v-if="!user"
				height="h-[40px]"
				@click="push('/user/login')"
				data-cy="login-link"
			>
				<span> Zaloguj się </span>
			</Button>
			<Avatar
				v-else
				:src="user.fileLocation || DEFAULT_AVATAR_IMAGE_URL"
				alt="zdjęcie profilowe"
				width="w-[50px]"
				additional-styles="cursor-pointer"
				@click="push(`/user/${user?._id}`)"
				data-cy="avatar-profile-link"
				:key="user.fileLocation || undefined"
			/>
		</div>
		<div class="flex absolute right-7 gap-2.5">
			<div
				class="w-11 h-11 cursor-pointer flex items-center content-center"
				@click="push('/')"
			>
				<Icon
					v-if="showHomeIcon"
					icon="material-symbols:home"
					class="w-9 h-9 text-black dark:text-white"
				/>
			</div>
			<div
				class="w-11 h-11 cursor-pointer flex items-center content-center"
				@click="switchTheme()"
			>
				<Icon
					v-if="theme.type === 'light'"
					icon="ph:sun-fill"
					class="w-9 h-9 text-black dark:text-white"
				/>
				<Icon
					v-else
					icon="ph:moon-fill"
					class="w-9 h-9 text-black dark:text-white"
				/>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { Icon } from "@iconify/vue"
import { useAppStore } from "../app/stores/appStore"
import { DEFAULT_AVATAR_IMAGE_URL } from "../app/constants/urls"
import Button from "./Button.vue"
import Avatar from "./Avatar.vue"

const appState = useAppStore()
const { push } = useRouter()
const showHomeIcon = location.pathname !== "/"
const { switchTheme } = appState
const { user, theme } = storeToRefs(appState)
</script>

<!-- <style lang="scss" scoped>
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
		v-bind("theme.type === 'dark' ? theme.colors.main : '#050505'");
	display: flex;
	align-items: center;
	box-shadow: 0px 0px 1px 2px
		v-bind("theme.type === 'dark' ? theme.colors.main : '#050505'");
	.left {
		display: flex;
		position: absolute;
		left: 30px;
		gap: 10px;
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
</style> -->
