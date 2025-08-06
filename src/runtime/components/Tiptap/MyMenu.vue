<script setup lang="ts">
import { TiptapBubbleMenu } from '#components'
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
  <TiptapBubbleMenu
    v-if="editor"
    :editor="editor"
  >
    <div class="bubble-menu">
      <UiBtn
        :active="editor.isActive('bold')"
        @click="focusedChain()?.toggleBold().run()"
      >
        <b> B </b>
      </UiBtn>
      <UiBtn
        :active="editor.isActive('italic')"
        @click="focusedChain()?.toggleItalic().run()"
      >
        <i> I </i>
      </UiBtn>
      <UiBtn
        :active="editor.isActive('strike')"
        @click="focusedChain()?.toggleStrike().run()"
      >
        <s> S </s>
      </UiBtn>
      <UiBtn
        :active="editor.isActive('underline')"
        @click="focusedChain()?.toggleUnderline().run()"
      >
        <u> U </u>
      </UiBtn>
    </div>
  </TiptapBubbleMenu>
</template>

<style scoped>
.bubble-menu {
  border: 1px solid #ccc;
  background-color: var(--snabb-ui-bg);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 4px;
  display: flex;
  gap: 0.2rem;
  padding: 0.2rem;
}

button {
  width: 2rem !important;
  padding: 0rem !important;
}
</style>
