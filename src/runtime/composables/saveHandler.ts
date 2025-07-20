import { useState } from "#app";
import { computed, ref } from "vue";

export type SaveEvent = {
    timestamp: Date;
    title: string;
    id: string;
}

// In-memory store for save functions (not serialized)
const saveFunctions = new Map<string, () => Promise<void>>();

export const useSaveHandler = () => {
    const saveEvents = useState<SaveEvent[]>('save-events', () => []);

    const addSaveEventWrapper = (id: string, saveFunction: () => Promise<void>, title: string = id) => {
        saveFunctions.set(id, saveFunction);
        addSaveEvent({ id, timestamp: new Date(), title });
    }

    const addSaveEvent = (event: SaveEvent) => {
        const existingIndex = saveEvents.value.findIndex(e => e.id === event.id);
        
        if (existingIndex !== -1) {
            saveEvents.value[existingIndex] = { ...event, timestamp: new Date() };
        } else {
            saveEvents.value.push({ ...event, timestamp: new Date() });
        }
    }

    const getSaveEvents = () => saveEvents;

    const saveAll = async () => {
        for (const event of saveEvents.value) {
            const saveFunction = saveFunctions.get(event.id);
            if (saveFunction) {
                try {
                    await saveFunction();
                } catch (error) {
                    console.error(`Error saving ${event.title}:`, error);
                }
            }
        }
        
        saveEvents.value.length = 0;
        saveFunctions.clear();
    }

    const hasChanges = computed(() => saveEvents.value.length > 0);

    return {
        addSaveEvent,
        addSaveEventWrapper,
        getSaveEvents,
        saveAll,
        hasChanges
    }

}