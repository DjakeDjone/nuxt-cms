<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { type CreateBlogPost, defaultBlogPost } from '#imports'

const props = defineProps<{
  id?: string
}>()

const blog = ref<CreateBlogPost>(defaultBlogPost())

watchEffect(async () => {
  if (props.id) {
    blog.value = await $fetch(`/api/blog/${props.id}`)
  }
})

const saveBlogPost = async () => {
  const res = await $fetch(`/api/blog${props.id ? `/${props.id}` : '/'}`, {
    method: 'POST',
    body: blog.value,
  })
  console.log('Blog post saved:', res)
}
</script>

<template>
  <div>
    <h1>Blog Post</h1>
    <UiBtn @click="saveBlogPost">
      Save Post
    </UiBtn>
    <TiptapEditorWrapper v-model="blog.content" />
  </div>
</template>
