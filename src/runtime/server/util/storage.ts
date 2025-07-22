// @ts-expect-error Runtime import issue
import { useRuntimeConfig, useStorage } from '#imports'

export const useDefaultStorage = () => {
  const storageKey = useRuntimeConfig().editableContent?.storageKey
  return useStorage(storageKey)
}
