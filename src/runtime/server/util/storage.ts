import { useRuntimeConfig, useStorage } from '#imports'

export const useDefaultStorage = () => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey
  return useStorage(storageKey)
}

export const useAuthStorage = () => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey
  if (!storageKey) {
    return useDefaultStorage()
  }
  return useStorage(`${storageKey}:auth`)
}
