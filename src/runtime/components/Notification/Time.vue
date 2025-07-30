<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'NotificationTime' })

const props = defineProps<{
  duration: number
  remaining: number
  color?: string
}>()

const remainingTime = computed(() => {
  const seconds = Math.floor(props.remaining / 1000)
  return seconds > 0 ? `${seconds}s` : '0s'
})

const remainingPercent = computed(() => {
  return Math.max(0, Math.min(100, (props.remaining / props.duration) * 100))
})
</script>

<template>
  <div class="timeline">
    <div
      class="timeline-bar"
      :style="{ width: `${remainingPercent}%`, backgroundColor: props.color || '#007bff' }"
    />
    <span class="remaining-time-count">{{ remainingTime }}</span>
  </div>
</template>

<style scoped>
.timeline {
    width: 100%;
    height: .5rem;
    position: relative;
    margin-top: 0.5rem;
}

.timeline-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: width 0.1s linear;
    border-radius: 0.25rem;
}

.remaining-time-count {
    position: absolute;
    top: 15px;
    left: 0;
    font-size: 0.8em;
    color: #555;
}
</style>
