<script setup lang="ts">
import { TiptapStarterKit, useEditor, watch } from '#imports';

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
    extensions: [TiptapStarterKit],
    content: modelValue.value,
    onUpdate: ({ editor }) => {
        modelValue.value = editor.getHTML()
    },
});

watch(modelValue, (newValue) => {
    console.log('Model value changed:', newValue);
    if (editor.value) {
        editor.value.commands.setContent(newValue);
    }
}, { immediate: true })

</script>

<template>
    <div>
        <TiptapEditorContent :editor="editor as any" />
    </div>
</template>

<style>
.ProseMirror:focus {
    outline: none;
}
</style>
