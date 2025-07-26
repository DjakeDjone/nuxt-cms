<script setup lang="ts">
import { TiptapBubbleMenu } from '#components';
import { Editor } from '@tiptap/core'

const props = defineProps<{
    editor: Editor | undefined;
}>()

const focusedChain = () => {
    if (!props.editor) return;
    return props.editor.chain().focus();
}


</script>

<template>
    <TiptapBubbleMenu :editor="editor" v-if="editor">
        <div class="bubble-menu">
            <UiBtn @click="editor.chain().focus().toggleBold().run()" :active="editor.isActive('bold')">
                <b>
                    B
                </b>
            </UiBtn>
            <UiBtn @click="editor.chain().focus().toggleItalic().run()" :active="editor.isActive('italic')">
                <i>
                    I
                </i>
            </UiBtn>
            <UiBtn @click="editor.chain().focus().toggleStrike().run()" :active="editor.isActive('strike')">
                <s>
                    S
                </s>
            </UiBtn>
            <UiBtn @click="editor.chain().focus().toggleUnderline().run()" :active="editor.isActive('underline')">
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
