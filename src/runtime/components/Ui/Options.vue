<script setup lang="ts">
const opened = defineModel<boolean>()
const props = defineProps<{
  anchor?: 'right' | 'left'
  nestingCount?: number
}>()
</script>

<template>
  <div class="ui-options">
    <UiBtn
      class="ui-options-trigger-container"
      @click="opened = !opened"
    >
      <div
        :class="{ 'flipped-icon': !opened }"
        class="animated-icon"
      >
        <slot name="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-dasharray="12"
              stroke-dashoffset="12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8l-7 7M12 8l7 7"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="12;0"
              />
            </path>
          </svg>
        </slot>
      </div>
      <slot name="trigger">
        Options Trigger
      </slot>
    </UiBtn>
    <div
      v-if="opened"
      class="ui-opsions-list"
      :class="`ui-options-${props.anchor || 'right'}`"
    >
      <slot name="ui-list">
        <UiList
          v-if="opened"
          orientation="vertical"
          :nesting-count="props.nestingCount || 1"
        >
          <slot name="options">
            Options Value
          </slot>
        </UiList>
      </slot>
      <!-- <slot name="options">
                Options Value
            </slot> -->
    </div>
  </div>
</template>

<style>
.flipped-icon {
    transform: scaleY(-1);
}

.animated-icon {
    transition: transform 0.3s ease-in-out;
}

.ui-options-trigger-container {
    display: flex;
}

.ui-options {
    position: relative;
}

.ui-opsions-list {
    position: absolute;
    z-index: 10000;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ui-options-right {
    right: 0;
}

.ui-options-left {
    left: 0;
}

/* any button inside of .ui-options */
.ui-options button {
    width: 100%;
}
</style>
