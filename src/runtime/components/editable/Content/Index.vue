<script setup lang="ts">
import { useFetch } from '#app'

defineOptions({
  name: 'EditableContentIndex',
})

const props = defineProps<{
  contentId: string
  class?: string
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
    <span :class="props.class">{{ content.content }}</span>
  </slot>
  <slot
    v-else-if="status === 'pending'"
    name="loading"
  >
    <span :class="props.class">Loading content...</span>
  </slot>
  <slot
    v-else
    name="error"
    :error="error"
  >
    <span :class="props.class">Error loading content.</span>
  </slot>
</template>
