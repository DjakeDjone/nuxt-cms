<script setup lang="ts">
import { ref, useRouter } from '#imports'
import { useUserHandler } from '../../composables/userHandler'
import type { UserCredentials } from '../../server/model/auth'

const props = defineProps<{
  redirectUrl?: string
}>()

const credentials = ref<UserCredentials>({
  username: '',
  password: '',
})

const login = async () => {
  try {
    const userHandler = useUserHandler()
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials.value,
    })
    userHandler.loginUser(response.user as any, response.token as any)
    useRouter().push(props.redirectUrl || '/')
  }
  catch (error) {
    console.error('Login failed:', error)
    // TODO: Handle error (e.g., show a notification)
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <div>
        <label for="username">Username:</label>
        <input
          id="username"
          v-model="credentials.username"
          type="text"
          required
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="credentials.password"
          type="password"
          required
        >
      </div>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>
