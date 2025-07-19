import { useRuntimeConfig, useStorage } from "#build/types/nitro-imports";

export const useDefaultStorage = () => {
    const storageKey = useRuntimeConfig().editableContent?.storageKey;
    return useStorage(storageKey);
}