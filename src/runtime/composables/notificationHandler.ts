import { useState } from '#app'
import { readonly } from 'vue'

export type Notification = {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  details?: string
  duration?: number
  timestamp: number
  read: boolean
}

const notificationDurationMapping = {
  info: 5000,
  success: 3000,
  warning: 7000,
  error: 10000,
}

export const useNotificationHandler = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const notify = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      read: false,
      duration: notification.duration ?? notificationDurationMapping[notification.type] ?? 5000,
    }
    notifications.value.push(newNotification)
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, newNotification.duration)
  }

  const handleError = (error: unknown, type: 'error' | 'warning' = 'error') => {
    const message = error instanceof Error ? error.message : String(error)
    notify({
      type,
      message: `An error occurred: ${message}`,
      details: error instanceof Error ? error.stack : undefined,
      duration: notificationDurationMapping[type],
    })
  }

  const markAsRead = (id: string) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  return {
    notifications: readonly(notifications),
    notify,
    markAsRead,
    removeNotification,
    clearNotifications,
    handleError,
  }
}
