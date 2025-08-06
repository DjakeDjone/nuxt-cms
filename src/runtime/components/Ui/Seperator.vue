<script setup lang="ts">
const props = defineProps<{
  mobileHidden?: boolean
}>()
</script>

<template>
  <span
    class="ui-separator"
    :class="{ 'mobile-hidden': props.mobileHidden }"
  />
</template>

<style scoped>
.ui-separator {
    display: inline-block;
    width: 1px;
    height: 1rem;
    background-color: var(--sui-fg);
    margin: 0 0.5rem;
}
@media (max-width: 600px) {
    .ui-separator.mobile-hidden {
        display: none;
    }
}
</style>
