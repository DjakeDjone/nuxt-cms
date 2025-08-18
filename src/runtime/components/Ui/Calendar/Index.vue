<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { CalendarDay, CalendarEvent } from '../../../model/calendar'
import { formatTime } from '#imports'

defineOptions({
  name: 'UiCalendar',
})

interface Props {
  events?: CalendarEvent[]
}

const selectedDateFrom = defineModel<Date | null>('selectedDateFrom', {
  default: () => null,
})
const selectedDateTo = defineModel<Date | null>('selectedDateTo', {
  default: () => null,
})

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
})

const emit = defineEmits<{
  'date-select': [date: Date]
  'range-select': [from: Date, to: Date]
  'event-click': [event: CalendarEvent]
  'selection-mode-change': [mode: 'single' | 'range']
}>()

const currentDate = ref(new Date())
const selectedEventIdx = ref<number>(0)
const calendarRef = ref<HTMLElement>()
const isSelectingRange = ref<boolean>(false)
const selectionMode = ref<'single' | 'range'>('single')

const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

const monthNames = Array.from({ length: 12 }, (_, i) => {
  return new Date(2000, i, 1).toLocaleString('default', { month: 'long' })
})

const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
  return new Date(2000, 0, i + 2).toLocaleString('default', { weekday: 'short' })
})

// Helper function to check if a date is in the selected range
const isDateInRange = (date: Date, from: Date | null, to: Date | null): boolean => {
  if (!from || !to) return false
  
  const dateStr = date.toDateString()
  const fromStr = from.toDateString()
  const toStr = to.toDateString()

  // If from and to are the same, only that date is selected
  if (fromStr === toStr) {
    return dateStr === fromStr
  }

  // Ensure from is before to
  const startDate = from <= to ? from : to
  const endDate = from <= to ? to : from

  return date >= startDate && date <= endDate
}

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const current = new Date(startDate)

  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const dayEvents = props.events.filter((event) => {
      const currentDateString = current.toDateString()
      const eventFromString = event.from.toDateString()
      const eventToString = event.to.toDateString()

      // Check if the current day is within the event's date range
      return current >= new Date(event.from.toDateString())
        && current <= new Date(event.to.toDateString())
    })

    // Check if current day is in selected range
    const isInSelectedRange = isDateInRange(current, selectedDateFrom.value, selectedDateTo.value)
    const isSelectedFrom = selectedDateFrom.value ? current.toDateString() === selectedDateFrom.value.toDateString() : false
    const isSelectedTo = selectedDateTo.value ? current.toDateString() === selectedDateTo.value.toDateString() : false

    days.push({
      date: new Date(current),
      isCurrentMonth: current.getMonth() === currentMonth.value,
      isToday: current.toDateString() === new Date().toDateString(),
      isSelected: isSelectedFrom || isSelectedTo,
      isSelectedFrom,
      isSelectedTo,
      isInSelectedRange,
      events: dayEvents,
    })

    current.setDate(current.getDate() + 1)
  }

  return days
})

// Methods
const navigateMonth = (direction: 'prev' | 'next') => {
  const newDate = new Date(currentDate.value)
  if (direction === 'prev') {
    newDate.setMonth(newDate.getMonth() - 1)
  }
  else {
    newDate.setMonth(newDate.getMonth() + 1)
  }
  currentDate.value = newDate
}

const selectDate = (date: Date) => {
  const clickedDate = new Date(date)

  if (selectionMode.value === 'single') {
    // Single date selection mode
    selectedDateFrom.value = new Date(clickedDate)
    selectedDateTo.value = new Date(clickedDate)
    isSelectingRange.value = false
    emit('date-select', new Date(clickedDate))
    emit('range-select', new Date(clickedDate), new Date(clickedDate))
  } else {
    // Range selection mode
    // If no range is being selected, start a new range
    if (!isSelectingRange.value) {
      selectedDateFrom.value = new Date(clickedDate)
      selectedDateTo.value = new Date(clickedDate)
      isSelectingRange.value = true
    }
    else {
      // If we're selecting a range, set the end date
      if (selectedDateFrom.value && clickedDate >= selectedDateFrom.value) {
        selectedDateTo.value = new Date(clickedDate)
      }
      else {
        // If clicked date is before the start date, swap them
        if (selectedDateFrom.value) {
          selectedDateTo.value = new Date(selectedDateFrom.value)
        }
        selectedDateFrom.value = new Date(clickedDate)
      }
      isSelectingRange.value = false
      if (selectedDateFrom.value && selectedDateTo.value) {
        emit('range-select', new Date(selectedDateFrom.value), new Date(selectedDateTo.value))
      }
    }
    emit('date-select', new Date(clickedDate))
  }

  selectedEventIdx.value = 0
}

const goToToday = () => {
  const today = new Date()
  currentDate.value = new Date(today)
  selectedDateFrom.value = new Date(today)
  selectedDateTo.value = new Date(today)
  isSelectingRange.value = false
  emit('date-select', new Date(today))
  emit('range-select', new Date(today), new Date(today))
}

const clearSelection = () => {
  selectedDateFrom.value = null
  selectedDateTo.value = null
  isSelectingRange.value = false
}

const toggleSelectionMode = () => {
  const newMode = selectionMode.value === 'single' ? 'range' : 'single'
  selectionMode.value = newMode
  
  // Clear current selection when switching modes
  clearSelection()
  
  emit('selection-mode-change', newMode)
}

const onEventClick = (event: CalendarEvent) => {
  selectedEventIdx.value = props.events.indexOf(event)
  // emit('event-click', event)
}

const getPrevEventIdx = (day: CalendarDay) => {
  if (day.isSelected) {
    return selectedEventIdx.value
  }
  return 0
}

const setCurrentYear = (year: number) => {
  currentDate.value = new Date(currentDate.value.setFullYear(year))
  console.log('Current year set to:', year)
}

const isToday = computed(() => {
  return selectedDateFrom.value?.toDateString() === new Date().toDateString()
})

// Keyboard navigation helpers
const navigateDate = (direction: 'up' | 'down' | 'left' | 'right') => {
  // If no date is selected, start with today
  const baseDate = selectedDateFrom.value || new Date()
  const newDate = new Date(baseDate)

  switch (direction) {
    case 'left':
      newDate.setDate(newDate.getDate() - 1)
      break
    case 'right':
      newDate.setDate(newDate.getDate() + 1)
      break
    case 'up':
      newDate.setDate(newDate.getDate() - 7)
      break
    case 'down':
      newDate.setDate(newDate.getDate() + 7)
      break
  }

  // Update current month if we've moved to a different month
  if (newDate.getMonth() !== currentDate.value.getMonth()
    || newDate.getFullYear() !== currentDate.value.getFullYear()) {
    currentDate.value = new Date(newDate)
  }

  selectDate(newDate)
}

const navigateToFirstDayOfMonth = () => {
  const firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  selectDate(firstDay)
}

const navigateToLastDayOfMonth = () => {
  const lastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
  selectDate(lastDay)
}

const navigateEventSelection = (direction: 'prev' | 'next') => {
  const selectedDay = calendarDays.value.find(day => day.isSelected)
  if (!selectedDay || selectedDay.events.length === 0) return

  if (direction === 'next') {
    selectedEventIdx.value = (selectedEventIdx.value + 1) % selectedDay.events.length
  }
  else {
    selectedEventIdx.value = selectedEventIdx.value === 0
      ? selectedDay.events.length - 1
      : selectedEventIdx.value - 1
  }
}

const selectCurrentEvent = () => {
  const selectedDay = calendarDays.value.find(day => day.isSelected)
  if (selectedDay && selectedDay.events.length > 0) {
    const event = selectedDay.events[selectedEventIdx.value]
    if (event) {
      emit('event-click', event)
    }
  }
}

// Keyboard event handler
const handleKeyDown = (event: KeyboardEvent) => {
  // Don't interfere with inputs or when modifiers are pressed
  if (event.target instanceof HTMLInputElement
    || event.target instanceof HTMLTextAreaElement
    || event.ctrlKey || event.metaKey || event.altKey) {
    return
  }

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      navigateDate('left')
      break
    case 'ArrowRight':
      event.preventDefault()
      navigateDate('right')
      break
    case 'ArrowUp':
      event.preventDefault()
      navigateDate('up')
      break
    case 'ArrowDown':
      event.preventDefault()
      navigateDate('down')
      break
    case 'Home':
      event.preventDefault()
      navigateToFirstDayOfMonth()
      break
    case 'End':
      event.preventDefault()
      navigateToLastDayOfMonth()
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectCurrentEvent()
      break
    case 't':
    case 'T':
      event.preventDefault()
      goToToday()
      break
    case 'PageUp':
      event.preventDefault()
      navigateMonth('prev')
      break
    case 'PageDown':
      event.preventDefault()
      navigateMonth('next')
      break
    case 'Tab':
      if (event.shiftKey) {
        event.preventDefault()
        navigateEventSelection('prev')
      }
      else {
        event.preventDefault()
        navigateEventSelection('next')
      }
      break
    case 'Escape':
      event.preventDefault()
      clearSelection()
      // Clear focus from calendar
      if (calendarRef.value) {
        calendarRef.value.blur()
      }
      break
  }
}

// focus on calendar when it is mounted
onMounted(() => {
  if (calendarRef.value) {
    calendarRef.value.focus()
  }
})
</script>

<template>
  <div
    ref="calendarRef"
    class="ui-calendar"
    tabindex="0"
    role="application"
    aria-label="Calendar navigation. Use arrow keys to navigate dates, click to select date range, Enter to select events, T for today, Escape to clear selection, Page Up/Down for months"
    @keydown="handleKeyDown"
    @focus="() => { }"
  >
    <!-- Calendar Header -->
    <div class="calendar-header">
      <div class="calendar-nav">
        <div class="calendar-controls">
          <div class="calendar-controls-month">
            <UiBtn
              aria-label="Previous month (Page Up)"
              title="Previous month (Page Up)"
              @click="navigateMonth('prev')"
            >
              &#8249;
            </UiBtn>
            <UiOptions
              anchor="left"
              :nesting-count="2"
            >
              <template #trigger>
                {{ monthNames[currentMonth] }}
              </template>
              <template #options>
                <UiBtnGroup>
                  <UiBtn
                    v-for="(month, index) in monthNames"
                    :key="index"
                    @click="currentMonth = index"
                  >
                    {{ month }}
                  </UiBtn>
                </UiBtnGroup>
              </template>
            </UiOptions>
            <UiBtn
              aria-label="Next month (Page Down)"
              title="Next month (Page Down)"
              @click="navigateMonth('next')"
            >
              &#8250;
            </UiBtn>
          </div>
          <UiNumberInput
            :model-value="currentYear"
            @update:model-value="setCurrentYear($event)"
          />
        </div>
      </div>
      <div class="calendar-actions">
        <UiBtn
          :active="selectionMode === 'range'"
          :title="`Switch to ${selectionMode === 'single' ? 'range' : 'single'} selection mode`"
          :aria-label="`Current mode: ${selectionMode} selection. Click to switch to ${selectionMode === 'single' ? 'range' : 'single'} selection`"
          @click="toggleSelectionMode"
        >
          {{ selectionMode === 'single' ? '📅 Single' : '📅 Range' }}
        </UiBtn>
        <UiBtn
          :active="isToday"
          title="Go to today (T)"
          aria-label="Go to today (T)"
          @click="goToToday"
        >
          Today {{ isToday ? '✓' : '' }}
        </UiBtn>
        <UiBtn
          v-if="isSelectingRange || (selectedDateFrom && selectedDateTo)"
          title="Clear selection (Escape)"
          aria-label="Clear selection (Escape)"
          @click="clearSelection"
        >
          Clear Selection
        </UiBtn>
      </div>
    </div>

    <!-- Range Selection Status -->
    <div
      v-if="selectedDateFrom && selectedDateTo && selectedDateFrom.toDateString() !== selectedDateTo.toDateString()"
      class="range-status"
    >
      <small>
        <strong>Selected Range:</strong>
        {{ selectedDateFrom.toLocaleDateString() }} - {{ selectedDateTo.toLocaleDateString() }}
        ({{ Math.ceil((selectedDateTo.getTime() - selectedDateFrom.getTime()) / (1000 * 60 * 60 * 24)) + 1 }} days)
      </small>
    </div>

    <!-- Selection Mode Status -->
    <div class="selection-mode-status">
      <small>
        <strong>Selection Mode:</strong> {{ selectionMode === 'single' ? 'Single Date' : 'Date Range' }}
        {{ selectionMode === 'range' && isSelectingRange ? '(selecting range...)' : '' }}
      </small>
    </div>

    <!-- Keyboard shortcuts help -->
    <UiKeyboardHelp>
      <template #title>
        Keyboard shortcuts:
      </template>
      <template>
        Arrow keys to navigate • Click to select ({{ selectionMode === 'single' ? 'single date' : 'click twice for range' }}) • Enter/Space
        to
        select event • T for today
        • Page Up/Down for months • Home/End for month boundaries • Tab/Shift+Tab to cycle events • Escape to clear
        selection
      </template>
    </UiKeyboardHelp>

    <!-- Days of Week Header -->
    <div class="calendar-weekdays">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="weekday-header"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div
      class="calendar-grid"
      role="grid"
      aria-label="Calendar grid"
    >
      <div
        v-for="day in calendarDays"
        :key="day.date.getTime()"
        class="calendar-day"
        :class="{
          'is-other-month': !day.isCurrentMonth,
          'is-today': day.isToday,
          'is-selected': day.isSelected,
          'is-selected-from': day.isSelectedFrom,
          'is-selected-to': day.isSelectedTo,
          'is-in-range': day.isInSelectedRange && !day.isSelected,
          'has-events': day.events.length > 0,
        }"
        role="gridcell"
        :aria-label="`${day.date.toLocaleDateString()}, ${day.events.length} events`"
        :aria-selected="day.isSelected"
        tabindex="-1"
        @click="selectDate(day.date)"
        @keydown.enter.prevent="selectDate(day.date)"
        @keydown.space.prevent="selectDate(day.date)"
      >
        <span class="day-number">
          {{ day.date.getDate() }}
        </span>

        <!-- show 1 event in preview -->
        <div
          v-if="day.events[getPrevEventIdx(day)]"
          :style="{ borderLeftColor: day.events[getPrevEventIdx(day)]!.color || 'var(--sui-p)' }"
          class="event-preview"
          :class="{ 'is-selected-event': day.isSelected && selectedEventIdx === getPrevEventIdx(day) }"
        >
          <div
            class="event-line"
            :style="{ backgroundColor: day.events[getPrevEventIdx(day)]!.color || 'var(--sui-p)' }"
            :title="day.events[getPrevEventIdx(day)]!.title"
            :aria-label="`Event: ${day.events[getPrevEventIdx(day)]!.title} from ${formatTime(day.events[getPrevEventIdx(day)]!.from)} to ${formatTime(day.events[getPrevEventIdx(day)]!.to)}`"
            role="button"
            tabindex="-1"
            @click.stop="onEventClick(day.events[getPrevEventIdx(day)]!)"
            @keydown.enter.stop.prevent="onEventClick(day.events[getPrevEventIdx(day)]!)"
            @keydown.space.stop.prevent="onEventClick(day.events[getPrevEventIdx(day)]!)"
          />
          <div class="event-details">
            <h2 class="event-title">
              <UiStrippedTxt
                :txt="day.events[getPrevEventIdx(day)]!.title"
                :max-length="30"
              />
            </h2>
            <p class="event-time">
              {{ formatTime(day.events[getPrevEventIdx(day)]!.from) }} - {{
                formatTime(day.events[getPrevEventIdx(day)]!.to)
              }}
            </p>
          </div>
        </div>

        <!-- Events -->
        <div
          v-if="day.events.length > 0"
          class="day-events"
        >
          <div
            v-for="(event, index) in day.events.slice(0, 7)"
            :key="event.id"
            class="event-dot"
            :class="{ 'is-selected-event': day.isSelected && selectedEventIdx === index }"
            :style="{ backgroundColor: event.color || 'var(--sui-p)' }"
            :title="event.title"
            :aria-label="`Event: ${event.title}`"
            role="button"
            tabindex="-1"
            @click.stop="onEventClick(event)"
            @keydown.enter.stop.prevent="onEventClick(event)"
            @keydown.space.stop.prevent="onEventClick(event)"
          />
          <span
            v-if="day.events.length > 7"
            class="more-events"
            :title="`${day.events.length - 7} more events`"
            :aria-label="`${day.events.length - 7} more events`"
          >
            +{{ day.events.length - 7 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-left-width: 2px;
  border-left-style: solid;
}

.event-details {
  width: 100%;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
  font-size: 0.875rem;
  margin: 0;
}

.event-time {
  font-size: 0.65rem;
  margin: 0;
}

.ui-calendar {
  background-color: var(--sui-bg);
  border-radius: var(--sui-border-radius);
  box-shadow: var(--sui-box-shadow);
  padding: 1rem;
  max-width: 100%;
  font-family: Arial, sans-serif;
  outline: none;
}

.ui-calendar:focus {
  box-shadow: var(--sui-box-shadow), 0 0 0 2px var(--sui-p);
}

.range-status {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: var(--sui-p);
  color: var(--sui-bg);
  border-radius: var(--sui-border-radius);
  text-align: center;
}

.range-status small {
  color: inherit;
  line-height: 1.4;
}

.selection-mode-status {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: var(--sui-hover-bg);
  border-radius: var(--sui-border-radius);
  text-align: center;
  border: 1px solid var(--sui-active-bg);
}

.selection-mode-status small {
  color: var(--sui-fg);
  line-height: 1.4;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.calendar-controls {
  display: flex;
  gap: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  min-width: 200px;
}

.calendar-controls-month {
  display: flex;
  align-items: center;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7 - 1px));
  gap: 1px;
  margin-bottom: 1px;
}

.weekday-header {
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: var(--sui-active-bg);
  font-size: 0.875rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7 - 1px));
  gap: 1px;
  background-color: var(--sui-active-bg);
}

.calendar-day {
  background-color: var(--sui-bg);
  min-height: 80px;
  padding: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.calendar-day:hover {
  background-color: var(--sui-hover-bg);
}

.calendar-day.is-other-month {
  color: #999;
  background-color: var(--sui-active-bg);
}

.calendar-day.is-today {
  background-color: var(--sui-hover-bg);
}

.calendar-day.is-selected {
  background-color: var(--sui-active-bg);
  border: 2px solid var(--sui-p);
}

.calendar-day.is-selected-from {
  background-color: var(--sui-p);
  color: var(--sui-bg);
  border-radius: 8px 0 0 8px;
}

.calendar-day.is-selected-to {
  background-color: var(--sui-p);
  color: var(--sui-bg);
  border-radius: 0 8px 8px 0;
}

.calendar-day.is-selected-from.is-selected-to {
  border-radius: 8px;
}

.calendar-day.is-in-range {
  background-color: color-mix(in srgb, var(--sui-p) 20%, transparent);
}

.day-number {
  font-weight: bold;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.day-events {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: center;
  margin-top: auto;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.event-dot:hover {
  transform: scale(1.2);
}

.event-dot.is-selected-event {
  transform: scale(1.3);
  box-shadow: 0 0 0 2px var(--sui-bg), 0 0 0 4px var(--sui-p);
}

.event-preview.is-selected-event {
  background-color: var(--sui-hover-bg);
}

.calendar-day:focus {
  outline: 2px solid var(--sui-p);
  outline-offset: -2px;
}

.more-events {
  font-size: 0.625rem;
  color: var(--sui-fg);
  margin-left: 2px;
  cursor: pointer;
}

/* Responsive design */
@media (max-width: 768px) {
  .ui-calendar {
    padding: 0.5rem;
  }

  .calendar-day {
    min-height: 60px;
    padding: 0.125rem;
  }

  .calendar-title {
    font-size: 1rem;
    min-width: 150px;
  }

  .weekday-header {
    padding: 0.25rem;
    font-size: 0.75rem;
  }

  .day-number {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .calendar-day {
    min-height: 50px;
  }

  .weekday-header {
    padding: 0.125rem;
  }

  .calendar-title {
    min-width: 120px;
  }
}
</style>
