<script setup lang="ts">
const props = defineProps<{
  type: 'info' | 'success' | 'warning' | 'error'
  size?: string
}>()

// const iconClasses = {
//   info: 'icon-info',
//   success: 'icon-success',
//   warning: 'icon-warning',
//   error: 'icon-error',
// };
</script>

<template>
  <Icon
    :name="`lucide:${props.type}`"
    :size="props.size || '30'"
  />
</template>
