<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

defineOptions({
  name: 'UiPopup',
})
const opened = defineModel('open')

const props = defineProps<{
  class: string
}>()

const dialogRef = ref<HTMLElement | null>(null)
const previouslyFocused = ref<Element | null>(null)

watch(() => opened.value, (isOpen) => {
  if (isOpen) {
    previouslyFocused.value = document.activeElement
    dialogRef.value?.focus()
  }
  else {
    (previouslyFocused.value as HTMLElement | null)?.focus()
  }
})

function close() {
  opened.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <teleport to="body">
    <Transition name="fade">
      <div
        v-if="opened"
        class="snabb-ui popup-container"
        :class="props.class"
      >
        <!-- backdrop -->
        <div
          class="popup-backdrop"
          @click="close"
        />

        <!-- dialog -->
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          class="popup-dialog"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
/* Essential styles only - advanced styling in editable-content.css */
.popup-container {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  backdrop-filter: blur(5px);
}

.popup-backdrop {
  position: absolute;
  inset: 0;
}

.popup-dialog {
  position: relative;
  width: fit-content;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
