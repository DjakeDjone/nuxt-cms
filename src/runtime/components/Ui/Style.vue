<script setup lang="ts">
defineOptions({
  name: 'UiStyle',
})

import ThemeSwitch from './ThemeSwitch.vue'
</script>

<template>
  <div class="snabb-ui sui-prose">
    <slot />
  </div>
</template>
