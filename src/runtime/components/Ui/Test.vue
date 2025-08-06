<script setup lang="ts">
const opened = defineModel<boolean>({
  default: true,
  type: Boolean,
})
</script>

<template>
  <div>
    <div class="test-wrapper">
      <div @click="opened = !opened">
        <span>
          test
        </span>
      </div>
      <div
        v-if="opened"
        class="test"
      >
        1
      </div>
    </div>
  </div>
</template>

<style>
/* test */
.test-wrapper {
  position: relative;
  z-index: 10;
}

.test {
  position: absolute;
  top: 4rem;
  left: 0;
  cursor: pointer;
  background-color: red;
}

/* end */
</style>
