<script setup lang="ts">
import { simpleCookieRef } from '#imports'

const stored = simpleCookieRef<boolean>('stored', false);

</script>

<template>
    <main class="page">
        <h1 class="text-2xl font-bold text-center my-4">
            Cookies Example {{ stored.value }}
        </h1>
        <div v-if="stored.value" class="text-center">
            <p class="text-green-500">Cookie is set to true!</p>
        </div>
        <div class="text-center">
            <button @click="stored.value = !stored.value" class="btn btn-primary">
                Toggle Cookie Value
            </button>
            <p class="mt-4">Cookie Value: {{ stored.value }}</p>
        </div>
    </main>
</template>