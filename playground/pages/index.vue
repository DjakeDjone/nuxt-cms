<template>
  <main>
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContent content-id="heading-text" />
    </h1>
    <EditableContentArea
      content-id="area-a"
      class="w-full"
    />
    <UiOptions>
      <template #trigger>
        Options
      </template>
      <template #options>
        <UiBtn @click="() => $router.push('/page-a')">
          Go to Page A
        </UiBtn>
        <UiBtn @click="() => $router.push('/page-b')">
          Go to Page B
        </UiBtn>
      </template>
    </UiOptions>
    hallo Welt
  </main>
</template>
