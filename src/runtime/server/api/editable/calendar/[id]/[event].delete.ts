import { defineEventHandler, getRouterParam } from 'h3'
import type { CalendarEvent } from '~/src/runtime/model/calendar'
import type { ApiResponse } from '~/src/runtime/server/model/response'
import { useCalendarStorage } from '../../../../util/storage'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? 'calendar'
  const eventId = getRouterParam(event, 'event') ?? 'not-defined'

  // TODO: Check auth

  const storage = useCalendarStorage()
  const calendarEntry = await storage.getItem<CalendarEvent[]>(id) ?? []

  const updatedCalendar = calendarEntry.filter((calEvent) => {
    console.log(`Checking eventid !${calEvent.id}! against !${eventId}!`)
    console.log(`Result: ${calEvent.id.toString() !== eventId}`)
    return calEvent.id.toString() !== eventId
  })
  console.log('Updated calendar:', updatedCalendar)
  storage.setItem(id, updatedCalendar)

  return {
    id: id,
    message: `content with id ${eventId} deleted successfully`,
    content: null,
  } as ApiResponse<null>
})
