<script setup lang="ts">
import { useFetch } from '#app';
import { type BlogPost } from '#imports';

defineOptions({
    name: 'BlogList'
})

const { data: posts } = useFetch('/api/blog', {
    method: 'GET'
})

</script>

<template>
    <div>
        <h1>Blog Posts</h1>
        <ul>
            <li v-for="post in posts?.items" :key="post.id">
                <h2>{{ post.title }}</h2>
                <p v-html="post.content"></p>
                <small>By {{ post.author }} on {{ new Date(post.createdAt).toLocaleDateString() }}</small>
            </li>
        </ul>
    </div>
</template>
