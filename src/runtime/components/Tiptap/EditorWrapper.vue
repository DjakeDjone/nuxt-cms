<script setup lang="ts">
import { onBeforeUnmount, TiptapStarterKit, unref, useEditor, watch } from '#imports'
import Underline from '@tiptap/extension-underline'

const props = defineProps<{
  default?: string
}>()

const modelValue = defineModel<string>({
  default: '',
  type: String,
})

if (props.default) {
  modelValue.value = props.default
}

const editor = useEditor({
  extensions: [TiptapStarterKit, Underline],
  content: modelValue.value,
  onUpdate: ({ editor }) => {
    if (editor.getHTML() !== modelValue.value) {
      modelValue.value = editor.getHTML()
    }
  },
})

watch(modelValue, (newValue) => {
  if (editor.value) {
    if (editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue)
    }
  }
}, { immediate: true })

onBeforeUnmount(() => {
  unref(editor)!.destroy()
})
</script>

<template>
  <div>
    <TiptapNav :editor="editor" />
    <TiptapMyMenu :editor="editor" />
    <TiptapEditorContent :editor="editor!" />
  </div>
</template>

<style>
.ProseMirror {
  padding-top: 1rem;
}
.ProseMirror:focus {
  outline: none;
}
</style>
