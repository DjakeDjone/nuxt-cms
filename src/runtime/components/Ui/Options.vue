<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'UiOptions',
})

const opened = defineModel<boolean>()
const props = defineProps<{
  anchor?: 'right' | 'left'
  nestingCount?: number
}>()

const optionsRef = ref<HTMLElement>()

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (opened.value && optionsRef.value && !optionsRef.value.contains(event.target as Node)) {
      opened.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div ref="optionsRef" class="ui-options">
    <UiBtn
      :active="opened"
      class="ui-options-trigger-container"
      @click="opened = !opened"
    >
      <div
        :class="{ 'flipped-icon': !opened }"
        class="animated-icon"
      >
        <slot name="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-dasharray="12"
              stroke-dashoffset="12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8l-7 7M12 8l7 7"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="12;0"
              />
            </path>
          </svg>
        </slot>
      </div>
      <div class="ui-options-trigger">
        <slot name="trigger">
          Options Trigger
        </slot>
      </div>
    </UiBtn>
    <div
      v-if="opened"
      class="ui-opsions-list"
      :class="`ui-options-${props.anchor || 'right'}`"
    >
      <slot name="ui-list">
        <UiList
          v-if="opened"
          orientation="vertical"
          :nesting-count="props.nestingCount || 1"
        >
          <slot name="options">
            Options Valuep
          </slot>
        </UiList>
      </slot>
    </div>
  </div>
</template>

<style>
.ui-options-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.flipped-icon {
  transform: scaleY(-1);
}

.animated-icon {
  transition: transform 0.3s ease-in-out;
}

.ui-options-trigger-container {
  display: flex;
}

.ui-options {
  position: relative;
}

.ui-opsions-list {
  margin-top: 0.2rem;
  position: absolute;
  z-index: 10000;
  background-color: var(--sui-bg, #fff);
  border: 1px solid var(--sui-border, #ccc);
  border-radius: var(--sui-border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ui-options-right {
  right: 0;
}

.ui-options-left {
  left: 0;
}

.ui-options button {
  width: 100%;
}
</style>
