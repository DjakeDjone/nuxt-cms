export interface CalendarEvent {
  id: string
  title: string
  date: Date
  color?: string
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}
