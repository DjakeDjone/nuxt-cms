<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CalendarDay, CalendarEvent } from '../../../types/calendar'
import { formatTime } from '#imports'

defineOptions({
    name: 'UiCalendar',
})

interface Props {
    events?: CalendarEvent[]
    selectedDate?: Date
}

const props = withDefaults(defineProps<Props>(), {
    events: () => [],
    selectedDate: () => new Date(),
})

const emit = defineEmits<{
    'date-select': [date: Date]
    'event-click': [event: CalendarEvent]
}>()

const currentDate = ref(new Date(props.selectedDate))
const selectedDate = ref(new Date(props.selectedDate))
const selectedEventIdx = ref<number>(0)

const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

const monthNames = Array.from({ length: 12 }, (_, i) => {
    return new Date(2000, i, 1).toLocaleString('default', { month: 'long' })
})

const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    return new Date(2000, 0, i + 2).toLocaleString('default', { weekday: 'short' })
})

const calendarDays = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
        const dayEvents = props.events.filter(event =>
            event.date.toDateString() === current.toDateString(),
        )

        days.push({
            date: new Date(current),
            isCurrentMonth: current.getMonth() === currentMonth.value,
            isToday: current.toDateString() === new Date().toDateString(),
            isSelected: current.toDateString() === selectedDate.value.toDateString(),
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
    selectedDate.value = new Date(date)
    selectedEventIdx.value = 0
    emit('date-select', new Date(date))
}

const goToToday = () => {
    const today = new Date()
    currentDate.value = new Date(today)
    selectDate(today)
    emit('date-select', new Date(today))
}

const onEventClick = (event: CalendarEvent) => {
    selectedEventIdx.value = props.events.indexOf(event)
    // emit('event-click', event)
}

const getPrevEventIdx = (day: CalendarDay) => {
    if (day.isSelected) {
        return selectedEventIdx.value;
    }
    return 0
}

const setCurrentYear = (year: number) => {
    currentDate.value = new Date(currentDate.value.setFullYear(year));
    console.log('Current year set to:', year);
}

</script>

<template>
    <div class="ui-calendar">
        <!-- Calendar Header -->
        <div class="calendar-header">
            <div class="calendar-nav">
                <UiBtn @click="navigateMonth('prev')">
                    &#8249;
                </UiBtn>
                <h2 class="calendar-title">
                    {{ monthNames[currentMonth] }}
                    <UiNumberInput :model-value="currentYear" @update:model-value="setCurrentYear($event)" />
                </h2>
                <UiBtn @click="navigateMonth('next')">
                    &#8250;
                </UiBtn>
            </div>
            <UiBtn @click="goToToday">
                Today
            </UiBtn>
        </div>

        <!-- Days of Week Header -->
        <div class="calendar-weekdays">
            <div v-for="day in daysOfWeek" :key="day" class="weekday-header">
                {{ day }}
            </div>
        </div>

        <!-- Calendar Grid -->
        <div class="calendar-grid">
            <div v-for="day in calendarDays" :key="day.date.getTime()" class="calendar-day" :class="{
                'is-other-month': !day.isCurrentMonth,
                'is-today': day.isToday,
                'is-selected': day.isSelected,
                'has-events': day.events.length > 0,
            }" @click="selectDate(day.date)">
                <span class="day-number">
                    {{ day.date.getDate() }}
                </span>

                <!-- show 1 event in preview -->
                <div v-if="day.events[getPrevEventIdx(day)]"
                    :style="{ borderLeftColor: day.events[getPrevEventIdx(day)]!.color || 'var(--sui-p)' }"
                    class="event-preview">
                    <div class="event-line"
                        :style="{ backgroundColor: day.events[getPrevEventIdx(day)]!.color || 'var(--sui-p)' }"
                        :title="day.events[getPrevEventIdx(day)]!.title"
                        @click.stop="onEventClick(day.events[getPrevEventIdx(day)]!)" />
                    <div class="event-details">
                        <h2 class="event-title">
                            <UiStrippedTxt :txt="day.events[getPrevEventIdx(day)]!.title" :max-length="30" />
                        </h2>
                        <p class="event-time">
                            {{ formatTime(day.events[getPrevEventIdx(day)]!.date) }}
                        </p>
                    </div>
                </div>

                <!-- Events -->
                <div v-if="day.events.length > 0" class="day-events">
                    <div v-for="event in day.events.slice(0, 7)" :key="event.id" class="event-dot"
                        :style="{ backgroundColor: event.color || 'var(--sui-p)' }" :title="event.title"
                        @click.stop="onEventClick(event)" />
                    <span v-if="day.events.length > 7" class="more-events"
                        :title="`${day.events.length - 7} more events`">
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
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.calendar-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.calendar-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
    min-width: 200px;
    text-align: center;
}

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
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
    grid-template-columns: repeat(7, calc(100% / 7));
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
    background-color: var(--sui-p);
}

.calendar-day.is-today:hover {
    background-color: var(--sui-p);
    opacity: 0.9;
}

.calendar-day.is-selected {
    background-color: var(--sui-active-bg);
    border: 2px solid var(--sui-p);
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
