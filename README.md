<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Nuxt data manager

A nuxt module with easy to use components for creating editable content and storing them in a kv database using nitro.

## Features

- edit simple text in an input field

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-data-mngr
```

That's it! You can now use the nuxt data manager in your Nuxt app ✨


## Usage

### Components

- `<EditableContent>`: A component for editing simple text content.
- `useSaveHandler`: A composable for handling save operations.

### Example

```vue
<script setup lang="ts">
const saveHandler = useSaveHandler()

const _save = async () => {
  console.log('Saving all changes...')
  await saveHandler.saveAll()
}
</script>

<template>
  <main>
    <EditableSaveBtn />
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContentAdmin
        content-id="heading-text"
        class="text-center w-fit"
      />
    </h1>
    <EditableContentAreaAdmin
      content-id="area-a"
      class="text-center w-fit"
    />
  </main>
</template>

<style scoped>
textarea:focus,
input:focus {
    outline: none;
}
</style>
```
