<script setup lang="ts">
import type { Notification } from '#imports'

defineOptions({ name: 'NotificationItem' })

const props = defineProps<{
  item: Notification
  close: (id: string) => void
}>()

const typeToBgColor: Record<string, string> = {
  info: '#d1ecf1',
  success: '#d4edda',
  warning: '#fff3cd',
  error: '#f8d7da',
}
</script>

<template>
  <div
    class="notification-item"
    :style="{ backgroundColor: typeToBgColor[props.item.type] || '#f0f0f0' }"
    :class="`notification-${props.item.type}`"
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
      @click="$emit('close', item.id); props.close(item.id)"
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
        :timestamp="item.timestamp"
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
    min-width: 300px;
    max-width: 400px;
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
    margin-left: .5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
}
</style>
