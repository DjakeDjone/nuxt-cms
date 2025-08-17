<script setup lang="ts">
import { useFetch, useState } from '#app'
import { watch, fixDates } from '#imports';
import type { CalendarEvent } from '~/src/runtime/model/calendar';

defineOptions({
  name: 'EditableCalendar',
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

</script>

<template>
  <UiCalendar :selected-date="selectedDate" :events="fixDates(events?.content) ?? []" />
</template>
