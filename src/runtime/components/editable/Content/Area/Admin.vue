<script setup lang="ts">
import { useFetch } from '#app';
import { useSaveHandler } from '#imports';
import { ref, watch } from 'vue';

const props = defineProps<{
    contentId: string;
}>();

const emit = defineEmits(['save', 'error', 'loading']);

const saveHandler = useSaveHandler();

const { data, error } = useFetch(`/api/editable/content/${props.contentId}`, {
    watch: [() => props.contentId],
});

if (!data) {
    console.warn(`No content found for ID: ${props.contentId}`);
}

const onSave = async () => {
    emit('loading', true);
    try {
        await $fetch(`/api/editable/content/${props.contentId}`, {
            method: 'POST',
            body: { content: content.value },
        });
        emit('save', content.value);
    } catch (err) {
        console.error('Error saving content:', err);
        emit('error', err);
    }
};

const content = ref(data.value?.content || '');

watch(() => data.value, (newData) => {
    if (newData) {
        content.value = newData.content;
    }
}, { immediate: true });

watch(content, (newContent) => {
    if (newContent !== data.value?.content) {
        
        saveHandler.addSaveEventWrapper(
            props.contentId,
            () => onSave(),
        )
    } else {
        saveHandler.removeSaveEvent(props.contentId);
    }
}, { immediate: true });

</script>


<template>
    <textarea v-model="content" placeholder="Editable content here..." />
</template>