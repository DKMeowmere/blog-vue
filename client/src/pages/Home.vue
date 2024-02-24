<template>
	<h1>Stwórz blog</h1>
	<Button @click="push('/blog/create')">Stwórz blog</Button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import Button from "../components/Button.vue"

const { push } = useRouter()
</script>

<style scoped lang="scss">
h1 {
	font-size: 3rem;
	text-align: center;
	margin-bottom: 30px;
}
button {
	width: 80%;
	max-width: 400px;
}
</style>
