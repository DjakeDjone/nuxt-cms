<script setup lang="ts">
const saveHandler = useSaveHandler()

const _save = async () => {
  console.log('Saving all changes...')
  await saveHandler.saveAll()
}
</script>

<template>
  <main class="prose w-full max-w-full p-4">
    <EditableSaveBtn />
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContentAdmin
        content-id="heading-text"
        class="text-center w-fit"
      />
    </h1>
    <EditableContentAreaAdmin
      content-id="area-a"
      class="w-full"
    />
  </main>
</template>

<style scoped>
textarea:focus,
input:focus {
    outline: none;
}
</style>
