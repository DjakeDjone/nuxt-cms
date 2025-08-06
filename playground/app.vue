<template>
  <UiStyle>
    <!-- <UiHeader>
      <NuxtLink to="/calendar">Calendar</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </UiHeader> -->
    <UiSmartHeader admin-prefix="/admin" />
    <NotificationStack />
    <NuxtLayout :name="layoutName"></NuxtLayout>
  </UiStyle>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import { computed } from 'vue'
const route = useRoute()
const layoutName = computed(() => route.path.startsWith('/admin') ? 'admin' : undefined)
</script>
