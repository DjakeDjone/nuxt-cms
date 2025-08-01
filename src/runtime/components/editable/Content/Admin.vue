<script setup lang="ts">
import { useFetch } from '#app'
import { useSaveHandler } from '#imports'
import { ref, watch } from 'vue'

defineOptions({
  name: 'EditableContentAdmin',
})

const props = defineProps<{
  contentId: string
}>()

const emit = defineEmits(['save', 'error', 'loading'])

const saveHandler = useSaveHandler()

const { data, error: _error } = useFetch(`/api/editable/content/${props.contentId}`, {
  watch: [() => props.contentId],
})

if (!data) {
  console.warn(`No content found for ID: ${props.contentId}`)
}

const onSave = async () => {
  emit('loading', true)
  await $fetch(`/api/editable/content/${props.contentId}`, {
    method: 'POST',
    body: { content: content.value },
  })
  emit('save', content.value)
}

const content = ref(data.value?.content || '')

watch(() => data.value, (newData) => {
  if (newData) {
    content.value = newData.content
  }
}, { immediate: true })

watch(content, (newContent) => {
  if (newContent !== data.value?.content) {
    saveHandler.addSaveEventWrapper(
      props.contentId,
      () => onSave(),
    )
  }
  else {
    saveHandler.removeSaveEvent(props.contentId)
  }
}, { immediate: true })
</script>

<template>
  <input v-model="content" placeholder="Editable content here...">
</template>
