import { defineNuxtPlugin } from '#app'
import { useAuthHandler } from '#imports';

export default defineNuxtPlugin(async (_nuxtApp) => {
  console.log('Plugin injected by my-module!')

  const users = _nuxtApp.$config.editableContent.auth.initUsers || [];

  // insert in the storage
  const authHandler = useAuthHandler();
  if ((await authHandler.getAllUsers()).length > 0) {
    console.warn('Auth users already exist, skipping initialization.');
    return;
  }
  users.forEach(async (user: any) => {
    try {
      await authHandler.updateUser(user.id, user);
    } catch (error) {
      console.error(`Failed to insert user ${user.username}:`, error);
    }
  });
})
