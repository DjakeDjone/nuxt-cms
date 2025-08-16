<template>
  <main class="page">
    <h1 v-editable="'Editable'">Hello World</h1>
    <h1 v-managed="'Editable'">Hello World (managed)</h1>
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContent content-id="heading-text" />
    </h1>
    <EditableContentArea
      content-id="area-a"
      class="w-full"
    />
  </main>
</template>
