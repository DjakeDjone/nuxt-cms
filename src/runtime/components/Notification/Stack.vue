<script setup lang="ts">
import { useNotificationHandler } from '#imports'

defineOptions({ name: 'NotificationStack' })

const props = defineProps<{
  // right is the default alignment
  align?: 'left' | 'center'
}>()

defineEmits<{
  close: [string]
}>()

const { notifications, removeNotification } = useNotificationHandler()
</script>

<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="notification-stack"
    :class="{
      'notification-stack-left': props.align === 'left',
      'notification-stack-center': props.align === 'center',
    }"
  >
    <li
      v-for="item in notifications"
      :key="item.id"
      class="notification"
    >
      <slot
        name="notification"
        :item="item"
        :close-fn="removeNotification"
      >
        <NotificationItem
          :item="item"
          :close="removeNotification"
          @close="$emit('close', item.id)"
        />
      </slot>
    </li>
  </TransitionGroup>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

/* base style for notifications */
.notification-stack {
  position: fixed;
  bottom: 0rem;
  right: 1rem;
  max-width: 25rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.notification-stack-left {
  align-items: flex-start;
}

.notification-stack-center {
  align-items: center;
}

.notification {
  list-style: none;
}
</style>
