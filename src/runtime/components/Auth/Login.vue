<script setup lang="ts">
import { ref, useRouter } from '#imports';
import { useUserHandler } from '../../composables/userHandler';
import type { UserCredentials } from '../../server/model/auth';

const props = defineProps<{
  redirectUrl?: string
}>();

const credentials = ref<UserCredentials>({
  username: '',
  password: ''
})

const login = async () => {
  try {
    const userHandler = useUserHandler();
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials.value
    });
    userHandler.loginUser(response.user as any, response.token as any);
    useRouter().push(props.redirectUrl || '/');
  } catch (error) {
    console.error('Login failed:', error);
    // TODO: Handle error (e.g., show a notification)
  }
}

</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Username:</label>
        <input type="email" id="email" v-model="credentials.username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="credentials.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>