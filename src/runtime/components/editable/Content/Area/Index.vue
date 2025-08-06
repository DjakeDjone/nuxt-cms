<script setup lang="ts">
import { useFetch } from '#app'

defineOptions({
  name: 'EditableContentAreaIndex',
})

const props = defineProps<{
  contentId: string
}>()

const {
  data: content,
  error,
  status,
} = useFetch(`/api/editable/content/${props.contentId}`, {
  watch: [() => props.contentId],
})
</script>

<template>
  <slot
    v-if="content"
    :content="content"
  >
    <div v-html="content.content" />
  </slot>
  <slot
    v-else-if="status === 'pending'"
    name="loading"
  >
    Loading content...
  </slot>
  <slot
    v-else
    name="error"
    :error="error"
  >
    Error loading content.
  </slot>
</template>
