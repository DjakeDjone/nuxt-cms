<script setup lang="ts">
defineOptions({
  name: "UiBtn",
});

const props = defineProps<{
  active?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="ui-btn"
    :class="{ 'is-active': props.active, 'ui-btn-loading': props.loading }"
    @click="emit('click')"
  >
    <slot />
    <span v-if="props.loading" class="btn-pre-icon">
      <Icon name="eos-icons:bubble-loading" />
    </span>
  </button>
</template>

<style>
.btn-pre-icon {
  padding: 0 0.2rem;
}

.ui-btn {
  padding: 0.2rem 0.4rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.is-active {
  background-color: var(--sui-active-bg);
}

.ui-btn:hover {
  background-color: var(--sui-hover-bg);
}

.ui-btn-loading {
  opacity: 0.7;
  pointer-events: none;
  content: "";
  position: relative;
}
</style>
