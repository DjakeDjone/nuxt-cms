<script setup lang="ts">
const popupOpened = ref(false)
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
    <UiBtn @click="popupOpened = true">
      Open Popup
    </UiBtn>
    <UiPopup
      v-model:open="popupOpened"
      class="sui-prose"
    >
      <h1>
        Hello, this is a popup!
      </h1>
      <p>This is some content inside the popup.</p>
    </UiPopup>
  </div>
</template>
