<template>
  <div
    class="btn-group"
    role="group"
  >
    <slot />
  </div>
</template>

<style scoped>
.btn-group {
  border-radius: 0.4rem;
  overflow: hidden;
}

.btn-group > * {
  border-radius: 0;
}

.btn-group > *:first-child {
  border-top-left-radius: var(--btn-border-radius);
  border-bottom-left-radius: var(--btn-border-radius);
}

.btn-group > *:last-child {
  border-top-right-radius: var(--btn-border-radius);
  border-bottom-right-radius: var(--btn-border-radius);
}
</style>
