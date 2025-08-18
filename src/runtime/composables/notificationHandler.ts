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

type NotificationServiceSettings = {
  autoRemove?: boolean
  consoleLog?: boolean
}

export const useNotificationHandler = () => {
  const notifications = useState<Notification[]>('notifications', () => [])
  const settings = useState<NotificationServiceSettings>(
    'notificationSettings',
    () => ({
      autoRemove: true,
      consoleLog: false,
    }),
  )

  const notify = (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      read: false,
      duration:
        notification.duration
        ?? notificationDurationMapping[notification.type]
        ?? 5000,
    }
    logToConsole(newNotification)
    if (settings.value.autoRemove) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, newNotification.duration)
    }
    notifications.value.push(newNotification)
  }

  const logToConsole = (notification: Notification) => {
    if (settings.value.consoleLog) {
      const logMethod
        = notification.type === 'error'
          ? console.error
          : logMethod(
              `[Notification] ${notification.type.toUpperCase()}: ${
                notification.message
              }`,
              {
                details: notification.details,
                timestamp: new Date(notification.timestamp).toISOString(),
              },
            )
    }
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

  const setSettings = (newSettings: Partial<NotificationServiceSettings>) => {
    Object.assign(settings.value, newSettings)
  }

  return {
    notifications: readonly(notifications),
    notify,
    markAsRead,
    removeNotification,
    clearNotifications,
    handleError,
    settings: readonly(settings),
    setSettings,
  }
}
