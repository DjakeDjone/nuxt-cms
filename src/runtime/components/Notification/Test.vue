<script setup lang="ts">
import { onMounted, useNotificationHandler } from '#imports'

defineOptions({ name: 'NotificationTest' })

// create a new notificaiton every 10 seconds
const notificationHandler = useNotificationHandler()

onMounted(() => {
  setInterval(() => {
    const types = ['info', 'success', 'warning', 'error']
    const randomType = types[Math.floor(Math.random() * types.length)]
    notificationHandler.notify({
      type: randomType as 'info' | 'success' | 'warning' | 'error',
      message: 'This is a test notification',
    })
  }, 1000)
})
</script>

<template>
  <div>Notification Testing Component</div>
</template>
