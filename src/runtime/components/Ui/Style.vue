<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue'

defineOptions({
  name: 'UiStyle',
})
</script>

<template>
  <div class="snabb-ui sui-prose">
    <slot />
  </div>
</template>
