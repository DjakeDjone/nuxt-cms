<script setup lang="ts">
defineOptions({
  name: 'UiBtn',
})

const props = defineProps<{
  active?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :class="{ 'is-active': props.active }"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style>
button {
    padding: 0.2rem .4rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.is-active {
    background-color: #00000013;
    border: 1px solid #00000026;
    font-weight: bold;
}

button:hover {
    background-color: #00000013;
}
</style>
