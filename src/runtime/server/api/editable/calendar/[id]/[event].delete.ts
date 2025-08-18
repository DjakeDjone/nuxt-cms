import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { defaultCalendarEvent, type CalendarEvent } from '~/src/runtime/model/calendar'
import type { ApiResponse } from '~/src/runtime/server/model/response'
import { useCalendarStorage } from '../../../../util/storage'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? 'calendar'
  const eventId = getRouterParam(event, 'event') ?? 'not-defined'

  // TODO: Check auth

  const storage = useCalendarStorage()
  const calendarEntry = await storage.getItem<CalendarEvent[]>(id) ?? []

  const updatedCalendar = calendarEntry.filter((event) => {
    (`Checking eventid !${event.id}! against !${eventId}!`)
    (`Result: ${event.id.toString() !== eventId}`)
    return event.id.toString() !== eventId
  })
  ('Updated calendar:', updatedCalendar)
  storage.setItem(id, updatedCalendar)

  return {
    id: id,
    message: `content with id ${eventId} deleted successfully`,
    content: null,
  } as ApiResponse<null>
})
