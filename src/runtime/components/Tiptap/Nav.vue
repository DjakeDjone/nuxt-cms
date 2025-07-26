<script setup lang="ts">
import { UiBtn } from '#components';
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
    <nav class="actions-bar">
        <div>
            <!-- headings (dropdown) -->
             <UiBtn class="action-button" @click="focusedChain()?.toggleHeading({ level: 1 }).run()"
                :active="props.editor?.isActive('heading', { level: 1 })">
                H1
            </UiBtn>
            <UiBtn class="action-button" @click="focusedChain()?.toggleHeading({ level: 2 }).run()"
                :active="props.editor?.isActive('heading', { level: 2 })">
                H2
            </UiBtn>
            <UiBtn class="action-button" @click="focusedChain()?.toggleHeading({ level: 3 }).run()"
                :active="props.editor?.isActive('heading', { level: 3 })">
                H3
            </UiBtn>

        </div>

        <UiBtn class="action-button" @click="focusedChain()?.toggleBold().run()"
            :active="props.editor?.isActive('bold')">
            <b>Bold</b>
        </UiBtn>
        <UiBtn class="action-button" @click="focusedChain()?.toggleItalic().run()"
            :active="props.editor?.isActive('italic')">
            <i>Italic</i>
        </UiBtn>
        <UiBtn class="action-button" @click="focusedChain()?.toggleStrike().run()"
            :active="props.editor?.isActive('strike')">
            <s>Strike</s>
        </UiBtn>
        <UiBtn class="action-button" @click="focusedChain()?.toggleUnderline().run()"
            :active="props.editor?.isActive('underline')">
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