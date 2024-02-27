<template>
	<h1 v-if="type === 'CREATE'">Stwórz konto</h1>
	<h1 v-if="type === 'LOGIN'">Zaloguj się</h1>
	<h1 v-if="type === 'UPDATE'">Edytuj konto</h1>
	<form @submit.prevent="handleSubmit">
		<template v-if="type !== 'LOGIN'">
			<p>Nazwa</p>
			<input type="text" v-model="name" data-cy="name-input" />
		</template>
		<template v-if="type !== 'UPDATE'">
			<p>Email</p>
			<input type="text" v-model="email" data-cy="email-input" />
		</template>
		<template v-if="type !== 'UPDATE'">
			<p>Hasło</p>
			<PasswordInput v-model="password" data-cy="password-input" />
		</template>
		<template v-if="type === 'UPDATE'">
			<p>Biografia</p>
			<textarea
				spellcheck="false"
				v-model="biography"
				data-cy="biography-input"
			></textarea>
		</template>
		<template v-if="type !== 'LOGIN'">
			<p>Zdjęcie profilowe</p>
			<FileInput
				id="user-file-input"
				data-cy="file-input"
				text="Dodaj
			zdjęcie profilowe"
				:change-cb="uploadFile"
			/>
			<Avatar :src="fileLocation" alt="zdjęcie profilowe" />
		</template>
		<Button type="submit" class="submit-btn" data-cy="submit-btn">
			Zatwierdź
		</Button>
		<Button
			v-if="type === 'LOGIN'"
			type="button"
			@click="push('/user/create')"
			data-cy="create-account-link"
		>
			Nie masz konta? Stworź teraz
		</Button>
		<template v-if="type === 'UPDATE'">
			<Button
				type="button"
				@click="isModalOpen = true"
				:bg-color="theme.colors.errorMain"
				data-cy="open-delete-account-modal-btn"
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
import { useUser } from "../hooks/useUser"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { UserType } from "@backend/types/user"
import { useHandleError } from "../../../app/hooks/useHandleError"
import { FILE_HAVE_TO_BE_IMAGE } from "../../../app/constants/errors"
import { useAppStore } from "../../../app/stores/appStore"
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
const { handleErrorWithAlert } = useHandleError()
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

function uploadFile(e: any) {
	try {
		const file: File = e.target?.files[0] || null
		const fileExt = file.name.split(".").pop() || ""
		const acceptedExts = new Set(["jpg", "png", "jpeg"])

		if (!acceptedExts.has(fileExt)) {
			throw new Error(FILE_HAVE_TO_BE_IMAGE)
		}
		fileName.value = file.name
		fileLocation.value = URL.createObjectURL(file)
	} catch (err: unknown) {
		handleErrorWithAlert(err as string)
	}
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
		push(`/user/${_id}`)
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
		push(`/user/${_id}`)
	}
}
</script>

<style scoped lang="scss">
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
</style>
