<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'UiStyle',
})

const theme = ref('light')

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    theme.value = storedTheme
  }
  else {
    theme.value = 'light'
  }
  document.documentElement.setAttribute('data-theme', theme.value)
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}
</script>

<template>
  <div
    class="snabb-ui"
    :class="theme"
  >
    <UiBtn
      class="theme-switch"
      @click="toggleTheme"
    >
      Toggle Theme
    </UiBtn>
    <slot />
  </div>
</template>
