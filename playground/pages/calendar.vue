<script setup lang="ts">
import type { CalendarEvent } from '../../src/runtime/types/calendar'

// Sample events for demonstration
const events = ref<CalendarEvent[]>([
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2025, 7, 20), // August 20, 2025
    color: '#007bff',
  },
  {
    id: '1',
    title: 'Team Meetingaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    date: new Date(2025, 7, 20), // August 20, 2025
    color: '#007bff',
  },
  {
    id: '1',
    title: 'Team Meeting3',
    date: new Date(2025, 7, 20), // August 20, 2025
    color: '#007bff',
  },
    {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2025, 7, 20), // August 20, 2025
    color: '#007bff',
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: new Date(2025, 7, 25), // August 25, 2025
    color: '#dc3545',
  },
  {
    id: '3',
    title: 'Conference Call',
    date: new Date(2025, 7, 22), // August 22, 2025
    color: '#28a745',
  },
  {
    id: '4',
    title: 'Code Review',
    date: new Date(2025, 7, 18), // August 18, 2025
    color: '#ffc107',
  },
])

const selectedDate = ref(new Date())

const onDateSelect = (date: Date) => {
  selectedDate.value = date
  console.log('Selected date:', date.toDateString())
}

const onEventClick = (event: CalendarEvent) => {
  console.log('Event clicked:', event)
  alert(`Event: ${event.title} on ${event.date.toDateString()}`)
}
</script>

<template>
  <main class="page">
    <h1 class="text-2xl font-bold text-center my-4">
      <EditableContent content-id="calendar-heading" />
    </h1>

    <div class="calendar-container">
      <UiCalendar :events="events" :selected-date="selectedDate" @date-select="onDateSelect"
        @event-click="onEventClick" />

      <div class="calendar-info">
        <h3 class="selected-date-title">
          Selected Date:
        </h3>
        <p class="selected-date">
          {{ selectedDate.toDateString() }}
        </p>

        <h3 class="events-title">
          Events on {{ selectedDate.toDateString() }}:
        </h3>
        <ul class="events-list">
          <li
            v-for="event in events.filter((e: CalendarEvent) => e.date.toDateString() === selectedDate.toDateString())"
            :key="event.id" class="event-item" :style="{ borderLeftColor: event.color }">
            {{ event.title }}
          </li>
          <li v-if="!events.some((e: CalendarEvent) => e.date.toDateString() === selectedDate.toDateString())"
            class="no-events">
            No events for this date
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
