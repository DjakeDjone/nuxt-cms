<script setup lang="ts">
const { notify } = useNotificationHandler();

const addDemoNotification = () => {
  const types = ["info", "success", "warning", "error"];
  const messages = [
    "This is an info notification!",
    "This is a success notification!",
    "This is a warning notification!",
    "This is an error notification!",
  ];

  const randomType =
    types.length > 0 ? types[Math.floor(Math.random() * types.length)] : "info";
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  notify({
    message: randomMessage || "Default message",
    type: randomType as "info" | "success" | "warning" | "error",
  });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
    <UiBtn class="demo-notification-btn" @click="addDemoNotification()">
      Show Notification
    </UiBtn>
  </div>
</template>
