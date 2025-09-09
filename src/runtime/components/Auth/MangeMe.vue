<script setup lang="ts">
import { useUserHandler } from '../../composables/userHandler'

defineOptions({ name: 'ManageMe' })

const { user, logoutUser } = useUserHandler()

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  logoutUser()
}
</script>

<template>
  <div
    v-if="user"
    class="flex flex-col gap-4"
  >
    <h2 class="text-xl">
      Manage your account
    </h2>
    <div>
      <p><span class="font-bold">Username:</span> {{ user.username }}</p>
      <p><span class="font-bold">Role:</span> {{ user.role }}</p>
    </div>
    <UiBtn @click="logout">
      Logout
    </UiBtn>
  </div>
</template>
