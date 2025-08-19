import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { ApiResponse } from '../../../model/response'
import { useCalendarStorage } from '../../../util/storage'
import type { CalendarEvent } from '~/src/runtime/model/calendar'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? 'calendar'
  const body = await readBody<{ event: CalendarEvent }>(event)

  // TODO: Check auth

  const storage = useCalendarStorage()
  const calendarEntry = await storage.getItem<CalendarEvent[]>(id) ?? []
  calendarEntry.push(body.event)

  // const updatedCalendarEntry = calendarEntry.sort((a, b) => a.from.getTime() - b.from.getTime());
  const updatedCalendarEntry = calendarEntry
  storage.setItem(id, updatedCalendarEntry)

  return {
    id: id,
    message: 'Content updated successfully',
    content: body.event,
  } as ApiResponse<CalendarEvent>
})
