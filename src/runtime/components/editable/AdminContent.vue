<script setup lang="ts">
import { useFetch } from '#app';
import { ref } from 'vue';

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

const onSave = async () => {
    emit('loading', true);
    try {
        await $fetch(`/api/editable/content/${props.contentId}`, {
            method: 'POST',
            body: { content: content.value }
        });
        emit('save', data.value);
    } catch (err) {
        console.error('Error saving content:', err);
        emit('error', err);
    }
};

const content = ref(data.value?.content || '');

</script>


<template>
    <div>
        <slot :content="data">
            <input v-model="content" placeholder="Editable content here..." />
            <button @click="onSave">Save</button>
        </slot>
    </div>
</template>