<script setup lang="ts">
import { useFetch } from '#app'

defineOptions({
  name: 'EditableContentAreaIndex',
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
    <div
      :class="props.class"
      v-html="content.content"
    />
  </slot>
  <slot
    v-else-if="status === 'pending'"
    name="loading"
  >
    <div :class="props.class">
      Loading content...
    </div>
  </slot>
  <slot
    v-else
    name="error"
    :error="error"
  >
    <div :class="props.class">
      Error loading content.
    </div>
  </slot>
</template>
