export interface CalendarEvent {
  id: string
  title: string
  details?: string
  from: Date
  to: Date
  color?: string
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

export const defaultCalendarEvent: CalendarEvent = {
  id: '',
  title: '',
  from: new Date(),
  details: '',
  to: new Date(new Date().setHours(new Date().getHours() + 1)),
  color: '',
}

export const defaultCalendarDay: CalendarDay = {
  date: new Date(),
  isCurrentMonth: false,
  isToday: false,
  isSelected: false,
  events: [],
}
