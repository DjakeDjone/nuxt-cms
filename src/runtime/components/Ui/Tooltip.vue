<script setup lang="ts">
import { ref } from "#imports";

defineOptions({
  name: "UiTooltip",
});

const props = defineProps<{
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  anchor?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
}>();

const isVisible = ref(false);

const showTooltip = () => {
  if (!props.disabled) {
    isVisible.value = true;
  }
};

const hideTooltip = () => {
  isVisible.value = false;
};
</script>

<template>
  <div
    class="ui-tooltip-wrapper"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot />
    <div
      v-if="isVisible && content"
      class="ui-tooltip"
      :class="`tooltip-${position || 'bottom'}`"
      :style="{
        top: anchor === 'top' ? '0' : '',
        bottom: anchor === 'bottom' ? '0' : '',
        left: anchor === 'left' ? '0' : '',
        right: anchor === 'right' ? '0' : '',
      }"
    >
      {{ content }}
    </div>
  </div>
</template>

<style scoped>
.ui-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.ui-tooltip {
  position: absolute;
  background-color: #333;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;
}

.ui-tooltip::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
}

.tooltip-top::after {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: #333;
}

.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
}

.tooltip-bottom::after {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: #333;
}

.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 5px;
}

.tooltip-left::after {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: #333;
}

.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5px;
}

.tooltip-right::after {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
