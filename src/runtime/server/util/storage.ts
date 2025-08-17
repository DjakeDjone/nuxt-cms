import { useRuntimeConfig, useStorage } from '#imports'
import type { Storage, StorageValue } from 'unstorage'

export const useDefaultStorage = (): Storage<StorageValue> => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey
  return useStorage<StorageValue>(`${storageKey}:default`)
}

export const useAuthStorage = (): Storage<StorageValue> => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey // TODO: extra storage key for auth
  if (!storageKey) {
    return useDefaultStorage()
  }
  return useStorage(`${storageKey}:auth`)
}

export const useCalendarStorage = (): Storage<StorageValue> => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey
  if (!storageKey) {
    return useDefaultStorage()
  }
  return useStorage(`${storageKey}:calendar`)
}
