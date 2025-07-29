<script setup lang="ts">
const props = defineProps<{
  type: 'info' | 'success' | 'warning' | 'error'
  size?: string
}>()

const iconClasses = {
  info: 'codicon:info',
  success: 'qlementine-icons:success-12',
  warning: 'codicon:warning',
  error: 'codicon:error',
};
</script>

<template>
  <Icon
    :name="iconClasses[props.type]"
    :size="props.size || '30'"
  />
</template>
