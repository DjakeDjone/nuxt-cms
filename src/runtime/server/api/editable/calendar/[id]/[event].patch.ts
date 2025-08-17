import { useCalendarStorage } from '#imports'
import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { defaultCalendarEvent, type CalendarEvent } from '~/src/runtime/model/calendar'
import type { ApiResponse } from '~/src/runtime/server/model/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? 'calendar'
  const eventId = getRouterParam(event, 'event') ?? ''
  const body = await readBody<{ event: CalendarEvent }>(event)

  // TODO: Check auth

  const storage = useCalendarStorage()
  const calendarEntry = await storage.getItem<CalendarEvent[]>(id) ?? []
  calendarEntry.push({...body.event, id: eventId})

  // const updatedCalendar = calendarEntry.sort((a, b) => a.from.getTime() - b.from.getTime());
  const updatedCalendar = calendarEntry
  storage.setItem(id, updatedCalendar)

  return {
    id: id,
    message: 'Content updated successfully',
    content: body.event,
  } as ApiResponse<CalendarEvent>
})
