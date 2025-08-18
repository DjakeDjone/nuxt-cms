<script setup lang="ts">
import { useFetch, useState } from '#app'
import { watch, fixDates, computed, useNotificationHandler } from '#imports'
import { type CalendarEvent, parseCalendarEvent } from '#imports'

defineOptions({
  name: 'EditableCalendarAdmin',
})

const props = defineProps<{
  calendarId: string
}>()

const notify = useNotificationHandler()

const selectedDateFrom = useState<Date>('selectedDateFrom', () => new Date())
const selectedDateTo = useState<Date>('selectedDateTo', () => new Date())

const {
  data: events,
} = useFetch(`/api/editable/calendar/${props.calendarId}`, {
  query: {
    from: selectedDateFrom,
    to: selectedDateTo,
  },
  watch: [() => props.calendarId, selectedDateFrom, selectedDateTo],
  transform: (data) => {
    if (!data?.content) return null
    return {
      ...data,
      content: data.content.map(parseCalendarEvent),
    }
  },
  deep: true,
})

const createEvent = async (event: CalendarEvent) => {
  const response = await $fetch(`/api/editable/calendar/${props.calendarId}/${event.id}`, {
    method: 'PATCH', // TODO: change to post
    body: { event },
  })

  if (events.value) {
    console.log('Event created:', event.title)
    events.value.content.push(event)
    notify.notify({
      message: 'Event created successfully',
      type: 'success',
    })
    console.log('Updated events:', events.value.content)
  }
}

const editEvent = async (event: CalendarEvent) => {
  const response = await $fetch(`/api/editable/calendar/${props.calendarId}/${event.id}`, {
    method: 'PATCH',
    body: { event },
  })
}

const deleteEvent = async (event: CalendarEvent) => {
  const response = await $fetch(`/api/editable/calendar/${props.calendarId}/${event.id}`, {
    method: 'DELETE',
  }).catch((error) => {
    console.error('Error deleting event:', error)
    notify.notify({
      message: 'Error deleting event',
      type: 'error',
    })
  }).then(() => {
    notify.notify({
      message: 'Event deleted successfully',
      type: 'success',
    })
    if (events.value) {
      events.value.content = events.value.content.filter(e => e.id != event.id)
      console.log('Updated events:', events.value.content)
    }
  })
}

const selectedEvents = computed(() => {
  if (!events.value?.content) return []

  const fromTime = selectedDateFrom.value.getTime()
  const toTime = selectedDateTo.value.getTime()

  return events.value.content.filter((event) => {
    if (!event.from) return false
    const eventTime = event.from.getTime()
    return eventTime >= fromTime && eventTime < toTime + 24 * 60 * 60 * 1000
  })
})
</script>

<template>
  <div class="editable-calendar-admin">
    {{ events?.content.length }}
    <UiCalendar
      v-model:selected-date-from="selectedDateFrom"
      v-model:selected-date-to="selectedDateTo"
      :events="events?.content ?? []"
    />
    <UiCalendarPreview
      v-model:from="selectedDateFrom"
      v-model:to="selectedDateTo"
      :events="selectedEvents!"
      @edit-event="editEvent"
      @delete-event="deleteEvent"
      @create-event="createEvent"
    />
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
