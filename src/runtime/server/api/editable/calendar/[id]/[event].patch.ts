import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { defaultCalendarEvent, type CalendarEvent } from '~/src/runtime/model/calendar'
import type { ApiResponse } from '~/src/runtime/server/model/response'
import { useCalendarStorage } from '../../../../util/storage'
import { getRouterParams } from '#imports'

export default defineEventHandler(async (event) => {
  (`Router params: ${JSON.stringify(getRouterParams(event))}`)
  const id = getRouterParam(event, 'id') ?? 'calendar'
  const eventId = getRouterParam(event, 'event')
  const body = await readBody<{ event: CalendarEvent }>(event)
  (`Updating event ${eventId} in calendar ${id}, body: ${JSON.stringify(body)}`)

  // TODO: Check auth

  const storage = useCalendarStorage()
  const calendarEntry = await storage.getItem<CalendarEvent[]>(id) ?? []

  const newEventId = eventId ?? (calendarEntry.length + 1).toString()
  calendarEntry.push({ ...body.event, id: newEventId })

  // const updatedCalendar = calendarEntry.sort((a, b) => a.from.getTime() - b.from.getTime());
  const updatedCalendar = calendarEntry
  storage.setItem(id, updatedCalendar)

  return {
    id: id,
    message: 'Content updated successfully',
    content: body.event,
  } as ApiResponse<CalendarEvent>
})
