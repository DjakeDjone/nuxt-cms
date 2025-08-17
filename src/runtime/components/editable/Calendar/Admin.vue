<script setup lang="ts">
import { useFetch, useState } from '#app'
import { watch, fixDates, computed } from '#imports';
import type { CalendarEvent } from '~/src/runtime/model/calendar';

defineOptions({
    name: 'EditableCalendarAdmin',
})

const props = defineProps<{
    calendarId: string
}>()

const fromDate = new Date();
const toDate = new Date();

const {
    data: events,
    error,
    status,
} = useFetch(`/api/editable/calendar/${props.calendarId}`, {
    query: {
        from: fromDate,
        to: toDate,
    },
    watch: [() => props.calendarId],
})

const selectedDate = useState<Date>("selectedDate", () => new Date());

watch(selectedDate, (newDate) => {
    fromDate.setDate(newDate.getDate() - 1);
    toDate.setDate(newDate.getDate() + 1);
})

const createEvent = async (event: CalendarEvent) => {
    const response = await $fetch(`/api/editable/calendar/${props.calendarId}`, {
        method: 'POST',
        body: event,
    });
}

const selectedEvents = computed(() => {
    return fixDates<CalendarEvent[]>(events.value?.content)?.filter(event => {
        return event.from.getFullYear() === selectedDate.value.getFullYear()
            && event.from.getMonth() === selectedDate.value.getMonth()
            && event.from.getDate() === selectedDate.value.getDate();
    }) || null;
});

</script>

<template>
    <div class="editable-calendar-admin">
        <UiCalendar v-model="selectedDate" :events="fixDates(events?.content) ?? []" />
        <UiCalendarPreview :events="selectedEvents" />
    </div>
</template>

<style scoped>
.editable-calendar-admin {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

@media (max-width: 768px) {
    .editable-calendar-admin {
        flex-direction: column;
    }
}
</style>