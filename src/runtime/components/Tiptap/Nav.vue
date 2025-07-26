<script setup lang="ts">
import { UiBtn } from '#components'
import type { Editor } from '@tiptap/core'

const props = defineProps<{
  editor: Editor | undefined
}>()

const focusedChain = () => {
  if (!props.editor) return
  return props.editor.chain().focus()
}
</script>

<template>
  <nav class="actions-bar">
    <div>
      <!-- headings (dropdown) -->
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive('heading', { level: 1 })"
        @click="focusedChain()?.toggleHeading({ level: 1 }).run()"
      >
        H1
      </UiBtn>
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive('heading', { level: 2 })"
        @click="focusedChain()?.toggleHeading({ level: 2 }).run()"
      >
        H2
      </UiBtn>
      <UiBtn
        class="action-button"
        :active="props.editor?.isActive('heading', { level: 3 })"
        @click="focusedChain()?.toggleHeading({ level: 3 }).run()"
      >
        H3
      </UiBtn>
    </div>

    <UiBtn
      class="action-button"
      :active="props.editor?.isActive('bold')"
      @click="focusedChain()?.toggleBold().run()"
    >
      <b>Bold</b>
    </UiBtn>
    <UiBtn
      class="action-button"
      :active="props.editor?.isActive('italic')"
      @click="focusedChain()?.toggleItalic().run()"
    >
      <i>Italic</i>
    </UiBtn>
    <UiBtn
      class="action-button"
      :active="props.editor?.isActive('strike')"
      @click="focusedChain()?.toggleStrike().run()"
    >
      <s>Strike</s>
    </UiBtn>
    <UiBtn
      class="action-button"
      :active="props.editor?.isActive('underline')"
      @click="focusedChain()?.toggleUnderline().run()"
    >
      <u>Underline</u>
    </UiBtn>
  </nav>
</template>

<style scoped>
.actions-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
}
</style>
