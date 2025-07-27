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
    class="ui-btn"
    :class="{ 'is-active': props.active }"
    @click="emit('click')"
  >
    <span class="btn-pre-icon">
      <slot name="pre-icon" />
    </span>
    <slot />
  </button>
</template>

<style>
.btn-pre-icon {
  padding: 0 0.2rem;
}
.ui-btn {
  padding: 0.2rem .4rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.is-active {
  background-color: #00000013;
}

.ui-btn:hover {
  background-color: #00000013;
}
</style>
