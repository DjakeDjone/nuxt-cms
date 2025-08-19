import { defineEventHandler, getRouterParam } from 'h3'
import { createError, getQuery } from '#imports'
import type { ApiResponse } from '../../../model/response'
import { useCalendarStorage } from '../../../util/storage'
import type { CalendarEvent } from '~/src/runtime/model/calendar'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? 'calendar'

  const query = getQuery(event)
  const _fromDate = query.from ?? new Date(new Date().setDate(new Date().getDate() - new Date().getDate() + 1))
  const _toDate = query.to ?? new Date(new Date().setMonth(new Date().getMonth() + 1, 0))

  const storage = useCalendarStorage()
  const entry = await storage.getItem<CalendarEvent[]>(id) ?? []

  if (!entry) {
    throw createError({
      statusCode: 404,
      message: `Content with id "${id}" not found`,
    })
  }

  const filteredEvents = entry // TODO: filter correctly

  return {
    id: id,
    message: 'Content retrieved successfully',
    content: filteredEvents,
  } as ApiResponse<CalendarEvent[]>
})
