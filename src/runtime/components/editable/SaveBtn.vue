<script setup lang="ts">
import { onMounted, useSaveHandler } from '#imports'
import { useNotificationHandler } from '../../composables/notificationHandler'

const saveHandler = useSaveHandler()
const notificationHandler = useNotificationHandler()
const save = async () => {
  try {
    await saveHandler.saveAll()
  }
  catch (error) {
    notificationHandler.handleError(error, 'error')
  }
}

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      save()
    }
  })
})
</script>

<template>
  <button
    v-if="saveHandler.hasChanges.value"
    class="saveBtn"
    @click="save"
  >
    Save ({{ saveHandler.getSaveEvents().value.length }})
  </button>
</template>

<style scoped>
.saveBtn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
