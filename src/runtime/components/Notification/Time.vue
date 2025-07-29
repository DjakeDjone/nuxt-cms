<script setup lang="ts">
defineOptions({ name: 'NotificationTime' })
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  duration: number
  timestamp: number
  color?: string
}>()

const remmainingMs = ref(Math.max(0, props.duration + props.timestamp - Date.now())) // Ensure it's not negative

const remainingTime = computed(() => {
  const seconds = Math.floor(remmainingMs.value / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}m`
  return `${seconds}s`
})

const remainingPercent = computed(() => {
  return Math.max(0, (remmainingMs.value / props.duration) * 100) // Ensure it's not negative
})

let animationFrameId: number | null = null

const updateRemainingMs = () => {
  remmainingMs.value = Math.max(0, props.duration + props.timestamp - Date.now())
  if (remmainingMs.value > 0) {
    animationFrameId = requestAnimationFrame(updateRemainingMs)
  }
}

onMounted(() => {
  updateRemainingMs()
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
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
