<script setup lang="ts">
const saveHandler = useSaveHandler()

const _save = async () => {
  console.log('Saving all changes...')
  await saveHandler.saveAll()
}
</script>

<template>
  <main class="page">
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContentAdmin
        content-id="heading-text"
        class="text-center"
      />
    </h1>
    <EditableContentAreaAdmin
      content-id="area-a"
      class="w-full"
    />
  </main>
</template>
