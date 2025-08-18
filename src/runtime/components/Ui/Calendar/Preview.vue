<script setup lang="ts">
import { defaultCalendarEvent, type CalendarEvent } from '#imports'
import { formatDate, useState } from '#imports'

defineOptions({
  name: 'UiCalendarPreview',
})

const props = defineProps<{
  events: CalendarEvent[]
}>()

const fromDate = defineModel<Date>('from')
const toDate = defineModel<Date>('to')

const constructDefaultEvent = (): CalendarEvent => {
  return {
    from: fromDate.value ?? new Date(),
    to: toDate.value ?? new Date(),
    title: '',
    details: '',
    id: '',
  }
}
const newEvent = useState<CalendarEvent>('newEvent', () => constructDefaultEvent())
const creatingEvent = useState<boolean>('creatingEvent', () => false)
const editEventOpen = useState<boolean>('editEvent', () => false)

const emit = defineEmits<{
  (e: 'edit-event', event: CalendarEvent): void
  (e: 'delete-event', event: CalendarEvent): void
  (e: 'create-event', event: CalendarEvent): void
}>()

const editEvent = (event: CalendarEvent) => {
  creatingEvent.value = false
  newEvent.value = event
  editEventOpen.value = true
}

const createEvent = () => {
  creatingEvent.value = true
  newEvent.value = constructDefaultEvent()
  editEventOpen.value = true
}

const deleteEvent = (event: CalendarEvent) => {
  emit('delete-event', event)
}

const saveEvent = () => {
  // close
  editEventOpen.value = false
  if (creatingEvent.value) {
    emit('create-event', newEvent.value)
  }
  else {
    emit('edit-event', newEvent.value)
  }
}
</script>

<template>
  <div class="calendar-preview">
    <div class="snabb-ui-flex-between">
      <h2 class="no-margin">
        Calendar Preview
      </h2>
      <UiBtn @click="createEvent()">
        <Icon name="mdi:plus" />
      </UiBtn>
    </div>
    <UiPopup v-model:open="editEventOpen">
      <input
        v-model="newEvent.title"
        placeholder="Event title"
      >
      <UiBtn @click="saveEvent">
        Save
      </UiBtn>
    </UiPopup>
    <UiList
      v-if="props.events && props.events.length"
      animate-on-change
    >
      <li
        v-for="event in props.events"
        :key="event.id"
      >
        <div class="event-header">
          <h3>
            -{{ event.id }}-
            {{ event.title }}
          </h3>
          <div>
            <slot
              name="event-actions"
              :event="event"
            >
              <UiBtnGroup>
                <UiBtn @click="editEvent(event)">
                  <Icon name="mdi:pencil" />
                </UiBtn>
                <UiBtn @click="deleteEvent(event)">
                  <Icon name="mdi:delete" />
                </UiBtn>
              </UiBtnGroup>
            </slot>
          </div>
        </div>
        <i class="event-time">
          {{ formatDate(event.from) }} - {{ formatDate(event.to) }}
        </i>
        <p v-if="event.details">
          {{ event.details }}
        </p>
        <p v-else>
          No details provided.
        </p>
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
