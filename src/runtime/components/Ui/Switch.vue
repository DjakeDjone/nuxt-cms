<script setup lang="ts">
defineOptions({
  name: 'UiSwitch',
})

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
  size?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const toggle = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
import { computed } from 'vue'

const trackHeight = computed(() => props.size ? `${props.size}px` : '')
const trackWidth = computed(() => props.size ? `${(props.size * (2.5 / 1.5)).toFixed(2)}px` : '')
const thumbSize = computed(() => props.size ? `${props.size - 4}px` : '')
const moveDistance = computed(() => props.size ? `${(props.size * ((2.5 / 1.5) - 1)).toFixed(2)}px` : '')
</script>

<template>
  <button class="ui-switch" :class="{
    'is-on': props.modelValue,
    'is-disabled': props.disabled,
  }" :disabled="props.disabled" @click="toggle">
    <span class="switch-track" :style="{ width: trackWidth, height: trackHeight }">
      <span class="switch-thumb"
        :style="{ width: thumbSize, height: thumbSize, transform: props.modelValue ? `translateX(${moveDistance})` : '' }" />
    </span>
    <span v-if="$slots.default" class="switch-label">
      <slot />
    </span>
  </button>
</template>

<style>
.ui-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.ui-switch:hover:not(.is-disabled) {
  background-color: #00000013;
}

.ui-switch.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.switch-track {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  background-color: #ccc;
  border-radius: 0.75rem;
  transition: background-color 0.2s ease;
}

.ui-switch.is-on .switch-track {
  background-color: #007bff;
}

.switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.ui-switch.is-on .switch-thumb {
  transform: translateX(1rem);
}

.switch-label {
  font-size: 0.9rem;
  user-select: none;
}
</style>
