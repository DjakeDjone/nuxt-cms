<script setup lang="ts">
import { onBeforeUnmount, TiptapImage, TiptapImagePlaceholder, TiptapStarterKit, unref, useEditor, useState, watch } from '#imports'
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

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return 'https://images.unsplash.com/photo-1751441839591-119ba895ce19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

const editor = useEditor({
  extensions: [TiptapStarterKit,
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TiptapImage,
    TiptapImagePlaceholder.configure({
      inline: false,
    }),
  ],
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
  <div
    class="tiptap-editor"
    :class="{ 'editor-border': editorBorder }"
  >
    <div
      class="nav"
      :class="{ 'nav-open': !navClosed, 'nav-closed': navClosed }"
    >
      <TiptapNav
        v-model:show-editor-border="editorBorder"
        #
        :editor="editor"
      />
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
  /* overflow: hidden; */
}

.nav-open {
  max-height: 3.5rem;
}

.nav-closed {
  max-height: 0 !important;
  overflow: hidden;
}
</style>
