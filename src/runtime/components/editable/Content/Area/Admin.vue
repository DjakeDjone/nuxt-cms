<script setup lang="ts">
import { useFetch } from '#app'
import { TiptapStarterKit, useEditor, useSaveHandler } from '#imports'
import { ref, watch } from 'vue'

defineOptions({
  name: 'EditableContentAreaAdmin',
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
  try {
    await $fetch(`/api/editable/content/${props.contentId}`, {
      method: 'POST',
      body: { content: content.value },
    })
    emit('save', content.value)
  }
  catch (err) {
    console.error('Error saving content:', err)
    emit('error', err)
  }
}

const content = ref(data.value?.content || '')

const editor = useEditor({
  extensions: [TiptapStarterKit],
  content: content.value,
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML()
  },
});

watch(() => data.value, (newData) => {
  if (newData) {
    content.value = newData.content;
    editor.value?.commands.setContent(newData.content);
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
  <TiptapEditorContent :editor="editor" />
</template>
