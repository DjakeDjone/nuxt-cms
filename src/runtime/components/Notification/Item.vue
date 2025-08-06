<script setup lang="ts">
import {
  onUnmounted,
  ref,
  useNotificationHandler,
  watchEffect,
  type Notification,
} from '#imports'

defineOptions({ name: 'NotificationItem' })

const { setSettings } = useNotificationHandler()
setSettings({ autoRemove: false }) // for manual control of notification removal

const props = defineProps<{
  item: Notification
  close: (id: string) => void
}>()

const paused = ref(false)
const remainingTime = ref(props.item.duration || 0)

if (props.item.duration) {
  const interval = setInterval(() => {
    if (!paused.value && remainingTime.value > 0) {
      remainingTime.value -= 100
      if (remainingTime.value <= 0) {
        props.close(props.item.id)
      }
    }
  }, 100)
  watchEffect(() => {
    if (props.item.duration) {
      remainingTime.value = props.item.duration
    }
  })
  onUnmounted(() => {
    clearInterval(interval)
  })
}

const typeToBgColor: Record<string, string> = {
  info: 'var(--sui-info)',
  success: 'var(--sui-success)',
  warning: 'var(--sui-warning)',
  error: 'var(--sui-danger)',
}
</script>

<template>
  <div
    class="notification-item"
    :style="{ backgroundColor: typeToBgColor[props.item.type] || '#f0f0f0' }"
    :class="`notification-${props.item.type}`"
    @mouseover="paused = true"
    @mouseleave="paused = false"
  >
    <div class="notification-content">
      <NotificationTypeIcon
        :type="item.type"
        class="notification-type-icon"
      />
      <span>{{ item.message }}</span>
    </div>
    <button
      class="close-btn"
      @click="
        $emit('close', item.id);
        props.close(item.id);
      "
    >
      <Icon
        name="lucide:x"
        size="20"
      />
    </button>
    <div class="bottom-timeline">
      <NotificationTime
        v-if="item.duration"
        :duration="item.duration"
        :remaining="remainingTime"
      />
    </div>
  </div>
</template>

<style scoped>
.bottom-timeline {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  width: 100%;
}

.notification-type-icon {
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.notification-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  min-width: min(18rem, calc(100%));
  max-width: max(25rem, calc(100%));
  padding: 0.5rem;
  padding-right: 2.5rem;
  border-radius: 0.25rem;
  /* background-color: #f0f0f0; */
  margin-bottom: 0.5rem;
  position: relative;
}

.notification-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  margin-left: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sui-fg);
}

.close-btn:hover {
  color: var(--sui-hover-bg);
}
</style>
