<script setup lang="ts">
import { useFetch } from '#app';
import { ref, watch } from 'vue';

const props = defineProps<{
    contentId: string;
}>();

const emit = defineEmits(['save', 'error', 'loading']);

const { data, error } = useFetch(`/api/editable/content/${props.contentId}`, {
    watch: [() => props.contentId],
});

if (!data) {
    console.warn(`No content found for ID: ${props.contentId}`);
}

const onSave = async (c: string) => {
    emit('loading', true);
    try {
        await $fetch(`/api/editable/content/${props.contentId}`, {
            method: 'POST',
            body: { content: c }
        });
        emit('save', c);
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

</script>


<template>
    <slot :content="content" :data="data" :onSave="onSave" :error="error">
        <input v-model="content" placeholder="Editable content here..." />
    </slot>
    <slot name="append" :content="content" :data="data" :onSave="onSave" :error="error"></slot>
</template>