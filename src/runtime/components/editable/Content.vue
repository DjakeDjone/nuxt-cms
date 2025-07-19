<script setup lang="ts">
import { useFetch } from '#app';

const props = defineProps<{
    contentId: string;
}>();

const { data: content, error } = useFetch(`/api/editable/content/${props.contentId}`, {
    watch: [() => props.contentId],
});


</script>


<template>
    <slot v-if="content" :content="content">
        {{ content.content }}
    </slot>
    <slot v-else name="loading">
        Loading content...
    </slot>
    <slot v-if="!content" name="error" :error="error">
        Error loading content.
    </slot>
</template>