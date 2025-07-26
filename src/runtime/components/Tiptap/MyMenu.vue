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
        @click="editor.chain().focus().toggleBold().run()"
      >
        <b>
          B
        </b>
      </UiBtn>
      <UiBtn
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <i>
          I
        </i>
      </UiBtn>
      <UiBtn
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <s>
          S
        </s>
      </UiBtn>
      <UiBtn
        :active="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <u>
          U
        </u>
      </UiBtn>
    </div>
  </TiptapBubbleMenu>
</template>

<style scoped>
.bubble-menu {
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    gap: .2rem;
    padding: .2rem;
}

button {
    width: 2rem !important;
    padding: 0rem !important;
}
</style>
