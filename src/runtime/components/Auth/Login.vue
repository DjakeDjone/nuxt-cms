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

const showPassword = ref(false)

</script>

<template>
  <form @submit.prevent="login()">
    <h1 class="form-title">Login</h1>
    <div class="input-group">
      <label for="username">Username:</label>
      <input id="username" placeholder="Enter your username" v-model="credentials.username" type="text" required>
    </div>
    <div class="input-group">
      <label for="password">Password:</label>
      <input id="password" placeholder="Enter your password" v-model="credentials.password" :type="showPassword ? 'text' : 'password'" required>
    </div>
    <div class="show-pwd-toggle">
      <label for="show-password">Show Password</label>
      <input id="show-password" type="checkbox" v-model="showPassword">
    </div>
    <UiBtn type="submit">
      Login
    </UiBtn>
  </form>
</template>
