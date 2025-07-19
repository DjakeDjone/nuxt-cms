// @ts-ignore
import { useRuntimeConfig, useStorage } from '#imports'

export const useDefaultStorage = () => {
    const storageKey = useRuntimeConfig().editableContent?.storageKey;
    return useStorage(storageKey);
}