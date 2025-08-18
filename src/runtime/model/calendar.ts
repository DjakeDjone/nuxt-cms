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
  isSelectedFrom?: boolean
  isSelectedTo?: boolean
  isInSelectedRange?: boolean
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

export const parseCalendarEvent = (data: any): CalendarEvent => {
  return {
    id: data.id || '',
    title: data.title || '',
    from: new Date(data.from) || new Date(),
    details: data.details || '',
    to: new Date(data.to) || new Date(new Date().setHours(new Date().getHours() + 1)),
    color: data.color || '',
  }
}

export const defaultCalendarDay: CalendarDay = {
  date: new Date(),
  isCurrentMonth: false,
  isToday: false,
  isSelected: false,
  isSelectedFrom: false,
  isSelectedTo: false,
  isInSelectedRange: false,
  events: [],
}
