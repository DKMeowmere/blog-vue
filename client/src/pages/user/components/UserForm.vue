<template>
	<h1 v-if="type === 'CREATE'" class="text-center text-[2rem] mb-[70px]">
		Stwórz konto
	</h1>
	<h1 v-if="type === 'LOGIN'" class="text-center text-[2rem] mb-[70px]">
		Zaloguj się
	</h1>
	<h1 v-if="type === 'UPDATE'" class="text-center text-[2rem] mb-[70px]">
		Edytuj konto
	</h1>
	<form @submit.prevent="handleSubmit" class="w-[90%] max-w-[500px] m-auto">
		<template v-if="type !== 'LOGIN'">
			<p class="text-center text-[1.6rem] mb-[20px]">Nazwa</p>
			<input
				type="text"
				v-model="name"
				data-cy="name-input"
				class="w-full h-[50px] rounded-[5px] mb-[40px] text-blackText text-[1.2rem] py-[5px] px-[10px]"
				placeholder="Wprowadź nazwe"
			/>
		</template>
		<template v-if="type !== 'UPDATE'">
			<p class="text-center text-[1.6rem] mb-[20px]">Email</p>
			<input
				type="text"
				v-model="email"
				data-cy="email-input"
				placeholder="Wprowadź email..."
				class="w-full h-[50px] rounded-[5px] mb-[40px] text-blackText text-[1.2rem] py-[5px] px-[10px]"
			/>
		</template>
		<template v-if="type !== 'UPDATE'">
			<p class="text-center text-[1.6rem] mb-[20px]">Hasło</p>
			<PasswordInput v-model="password" data-cy="password-input" />
		</template>
		<template v-if="type === 'UPDATE'">
			<p class="text-center text-[1.6rem] mb-[20px]">Biografia</p>
			<textarea
				spellcheck="false"
				v-model="biography"
				data-cy="biography-input"
				placeholder="Wprowadź biografie..."
				class="w-full h-[250px] rounded-[5px] mb-[40px] text-[1.2rem] text-blackText text-inherit py-[5px] px-[10px] resize-y"
			></textarea>
		</template>
		<template v-if="type !== 'LOGIN'">
			<p class="text-center text-[1.2rem] mb-[20px]">Zdjęcie profilowe</p>
			<FileInput
				id="user-file-input"
				data-cy="file-input"
				text="Dodaj
			zdjęcie profilowe"
				:change-cb="handleImageUpload"
        additional-styles="dark:text-whiteText"
			/>
			<Avatar :src="fileLocation" alt="zdjęcie profilowe" />
		</template>
		<Button
			type="submit"
			class="submit-btn"
			data-cy="submit-btn"
			height="h-[60px]"
			additional-styles="mt-[40px]"
		>
			Zatwierdź
		</Button>
		<Button
			v-if="type === 'LOGIN'"
			type="button"
			@click="push('/user/create')"
			data-cy="create-account-link"
			height="h-[60px]"
			additional-styles="mt-[40px]"
		>
			Nie masz konta? Stworz teraz
		</Button>
		<template v-if="type === 'UPDATE'">
			<Button
				type="button"
				@click="isModalOpen = true"
				:bg-color="theme.colors.errorMain"
				data-cy="open-delete-account-modal-btn"
				height="h-[60px]"
				additional-styles="mt-[40px]"
			>
				Usuń konto
			</Button>
			<Modal v-if="isModalOpen" @close="isModalOpen = false">
				<DeleteUserModalContent />
			</Modal>
		</template>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { UserType } from "@backend/types/user"
import { useUser } from "../hooks/useUser"
import { useAppStore } from "../../../app/stores/appStore"
import { useUploadFile } from "../../../app/hooks/useUploadFile"
import Button from "../../../components/Button.vue"
import FileInput from "../../../components/FileInput.vue"
import Avatar from "../../../components/Avatar.vue"
import PasswordInput from "../../../components/PasswordInput.vue"
import Modal from "../../../components/Modal.vue"
import DeleteUserModalContent from "./DeleteUserModalContent.vue"

const { type, user } = defineProps<{
	type: "CREATE" | "UPDATE" | "LOGIN"
	user?: UserType
}>()
const appState = useAppStore()
const { theme } = storeToRefs(appState)
const { createUser, updateUser, login } = useUser()
const { uploadImage } = useUploadFile()
const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const name = ref(user?.name || "")
const email = ref(user?.email || "")
const password = ref(user?.password || "")
const biography = ref(user?.biography || "")
const fileLocation = ref(user?.fileLocation || "")
const fileName = ref("")
const isModalOpen = ref(false)

function handleImageUpload(e: any) {
	const { file, fileLocation: imageLocation } = uploadImage(e)
	fileName.value = file?.name || ""
	fileLocation.value = imageLocation || ""
}

async function handleSubmit() {
	if (type === "CREATE") {
		const { _id } = await createUser({
			email: email.value,
			name: name.value,
			password: password.value,
			fileLocation: fileLocation.value,
			fileName: fileName.value,
		})
		_id && push(`/user/${_id}`)
	} else if (type === "UPDATE") {
		await updateUser({
			_id: id.toString(),
			biography: biography.value,
			fileLocation: fileLocation.value,
			name: name.value,
			fileName: fileName.value,
		})
	} else if (type === "LOGIN") {
		const { _id } = await login(email.value, password.value)
		_id && push(`/user/${_id}`)
	}
}
</script>

<!-- <style scoped lang="scss">
h1 {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 70px;
}
form {
	width: 90%;
	max-width: 500px;
	margin: auto;
	p {
		text-align: center;
		font-size: 1.6rem;
		margin-bottom: 20px;
	}
	input,
	.file-input-container,
	textarea {
		width: 100%;
		height: 50px;
		border-radius: 5px;
		margin-bottom: 40px;
		font-size: 1.2rem;
		padding: 5px 10px;
	}
	textarea {
		height: 250px;
		resize: vertical;
		font-family: inherit;
	}

	button {
		width: 100%;
		height: 60px;
		margin-top: 30px;
	}
}
</style> -->
