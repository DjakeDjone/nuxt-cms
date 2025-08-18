<script setup lang="ts">
import { onMounted, onUnmounted, useSaveHandler } from '#imports'
import { useNotificationHandler } from '../../composables/notificationHandler'

const saveHandler = useSaveHandler()
const notificationHandler = useNotificationHandler()
const save = async () => {
  try {
    await saveHandler.saveAll()
    notificationHandler.notify({
      type: 'success',
      message: 'Changes saved successfully',
    })
  }
  catch (error) {
    notificationHandler.handleError(error, 'error')
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault()
    save()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <ClientOnly>
    <button
      v-if="saveHandler.hasChanges.value"
      class="saveBtn"
      @click="save"
    >
      Save ({{ saveHandler.getSaveEvents().value.length }})
    </button>
  </ClientOnly>
</template>

<style scoped>
.saveBtn {
  position: fixed;
  z-index: 40;
  top: var(--sui-header-height);
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
