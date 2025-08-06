<script setup lang="ts">
import { onBeforeUnmount, TiptapStarterKit, unref, useEditor, useState, watch } from '#imports'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

const props = defineProps<{
  default?: string
  navClosed?: boolean
}>()

const modelValue = defineModel<string>({
  default: '',
  type: String,
})

if (props.default) {
  modelValue.value = props.default
}

const editor = useEditor({
  extensions: [TiptapStarterKit, Underline, TextAlign.configure({
    types: ['heading', 'paragraph'],
  })],
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

const editorBorder = useState<boolean>('tiptap-editor-border', () => false)
</script>

<template>
  <div class="tiptap-editor" :class="{ 'editor-border': editorBorder }">
    <div class="nav" :class="{ 'nav-open': !navClosed, 'nav-closed': navClosed }">
      <TiptapNav v-model:show-editor-border="editorBorder" # :editor="editor" />
    </div>
    <TiptapMyMenu :editor="editor" />
    <TiptapEditorContent :editor="editor!" />
  </div>
</template>

<style>
.editor-border {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.ProseMirror {
  padding-top: 1rem;
}

.ProseMirror:focus {
  outline: none;
}

.nav {
  transition: max-height 0.3s ease-in-out;
}

.nav-open {
  max-height: 3.5rem;
}

.nav-closed {
  max-height: 0 !important;
  overflow: hidden;
}

@media (max-width: 768px) {
  .nav-open {
    /* max-height: 7rem; */
    max-height: 0 !important;
    overflow: hidden;
  }
}
</style>
