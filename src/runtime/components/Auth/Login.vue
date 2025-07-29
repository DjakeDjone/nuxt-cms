<script setup lang="ts">
import { ref, useRouter } from '#imports'
import { useNotificationHandler } from '../../composables/notificationHandler'
import { useUserHandler } from '../../composables/userHandler'
import type { AuthToken, SanitizedUser, UserCredentials } from '../../server/model/auth'

defineOptions({
  name: 'AuthLogin',
})

const props = defineProps<{
  redirectUrl?: string
}>()

const notificationHandler = useNotificationHandler()

const credentials = ref<UserCredentials>({
  username: '',
  password: '',
})

const login = async () => {
  try {
    const userHandler = useUserHandler()
    const response = await $fetch<{ user: SanitizedUser, token: AuthToken }>('/api/auth/login', {
      method: 'POST',
      body: credentials.value,
    })
    userHandler.loginUser(response.user, response.token)
    notificationHandler.notify({
      type: 'success',
      message: 'Login successful',
    })
    useRouter().push(props.redirectUrl || '/')
  }
  catch (error) {
    console.error('Login failed:', error)
    notificationHandler.notify({
      type: 'error',
      message: 'Login failed. Please check your credentials.',
    })
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
