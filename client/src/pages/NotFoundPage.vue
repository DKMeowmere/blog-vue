<template>
	<div>
		<h1 class="text-center text-5xl mb-5">Nie znaleziono - 404</h1>
		<Button @click="push('/')"> Wróć do strony głównej </Button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import Button from "../components/Button.vue"

const { push } = useRouter()
</script>

<!-- <style scoped lang="scss">
h1 {
	text-align: center;
	font-size: 3rem;
	margin-bottom: 20px;
}
</style> -->
