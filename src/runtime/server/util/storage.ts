import { useRuntimeConfig, useStorage } from '#imports'

export const useDefaultStorage = () => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey
  return useStorage(`${storageKey}:default`);
}

export const useAuthStorage = () => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey // TODO: extra storage key for auth
  if (!storageKey) {
    return useDefaultStorage()
  }
  return useStorage(`${storageKey}:auth`)
}
