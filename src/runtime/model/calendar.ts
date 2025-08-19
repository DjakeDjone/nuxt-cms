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

export const parseCalendarEvent = (data: Record<string, unknown>): CalendarEvent => {
  return {
    id: typeof data.id === 'string' ? data.id : '',
    title: typeof data.title === 'string' ? data.title : '',
    from: data.from ? new Date(data.from as string) : new Date(),
    details: typeof data.details === 'string' ? data.details : '',
    to: data.to ? new Date(data.to as string) : new Date(new Date().setHours(new Date().getHours() + 1)),
    color: typeof data.color === 'string' ? data.color : '',
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
