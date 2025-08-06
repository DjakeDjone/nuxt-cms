<script setup lang="ts">
defineOptions({
  name: 'UiSwitchCrossed',
})

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
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
</script>

<template>
  <UiBtn
    class="ui-switch-crossed"
    :class="{
      'is-on': props.modelValue,
      'is-disabled': props.disabled,
    }"
    :disabled="props.disabled"
    @click="toggle"
  >
    <span
      v-if="$slots.default"
      class="switch-label"
      :class="{ 'is-crossed': !props.modelValue }"
    >
      <slot />
    </span>
  </UiBtn>
</template>

<style>
.ui-switch-crossed {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.ui-switch-crossed:hover:not(.is-disabled) {
  background-color: #00000013;
}

.ui-switch-crossed.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.switch-label {
  font-size: 0.9rem;
  user-select: none;
  position: relative;
  transition: opacity 0.2s ease;
}

.switch-label.is-crossed {
  opacity: 0.6;
}

.switch-label.is-crossed::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff4444;
  transform: translateY(-50%);
  border-radius: 1px;
}
</style>
