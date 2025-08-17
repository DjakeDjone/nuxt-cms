<script setup lang="ts">
import type { CalendarEvent } from '~/src/runtime/model/calendar';
import { formatDate } from '#imports';

defineOptions({
    name: 'UiCalendarPreview',
})

const props = defineProps<{
    events: CalendarEvent[]
}>()
</script>

<template>
    <div class="calendar-preview">
        <h2>Calendar Preview</h2>
        <UiList animate-on-change v-if="props.events.length">
            <li v-for="event in props.events" :key="event.id">
                <div class="event-header">
                    <h3>
                        {{ event.title }}
                    </h3>
                    <div>
                        <slot name="event-actions" :event="event">
                            <UiBtn @click="$emit('edit-event', event)">Edit</UiBtn>
                            <UiBtn @click="$emit('delete-event', event)">Delete</UiBtn>
                        </slot>
                    </div>
                </div>
                <i class="event-time">
                    {{ formatDate(event.from) }} - {{ formatDate(event.to) }}
                </i>
                <p v-if="event.details">{{ event.details }}</p>
                <p v-else>No details provided.</p>
            </li>
        </UiList>
    </div>
</template>

<style scoped>
.event-time {
    font-size: 0.9rem;
    opacity: 0.8;
}

.calendar-preview {
    padding: .5rem;
    width: 100%;
}

.event-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.event-header h3 {
    margin: 0;
    margin-bottom: .5rem;
}

.event-header .event-actions {
    display: flex;
    gap: 0.5rem;
}
</style>