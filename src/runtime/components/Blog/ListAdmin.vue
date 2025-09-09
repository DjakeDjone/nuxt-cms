<script setup lang="ts">
import { useFetch } from '#app';
import { type BlogPost } from '#imports';

defineOptions({
    name: 'BlogList'
})

const { data: posts } = useFetch<BlogPost[]>('/api/blog', {
    method: 'GET'
})

</script>

<template>
    <div>
        <h1>Blog Posts</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <h2>{{ post.title }}</h2>
                <p>{{ post.content }}</p>
            </li>
        </ul>
    </div>
</template>
