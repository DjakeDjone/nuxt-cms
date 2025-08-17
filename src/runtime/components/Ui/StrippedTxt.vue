<script setup lang="ts">
defineOptions({
  name: 'UiStrippedTxt',
})

const props = defineProps<{
  txt: string
  maxLength?: number
}>()
</script>

<template>
  {{ props.maxLength && props.txt.length > props.maxLength ? props.txt.slice(0, props.maxLength) + '...'
    : props.txt }}
</template>
