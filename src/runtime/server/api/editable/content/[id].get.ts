import { defineEventHandler, getRouterParam } from 'h3'
// @ts-ignore
import { createError, useRuntimeConfig } from '#imports'
import { useDefaultStorage } from '../../../util/storage'
import { ApiResponse } from '../../../model/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')??"content"
  const config = useRuntimeConfig()

  const storage = useDefaultStorage()
  const content = await storage.getItem(id)

  if (!content) {
    throw createError({
      statusCode: 404,
      message: `Content with id "${id}" not found`
    })
  }

  return {
    id: id,
    message: 'Content retrieved successfully',
    content: content
  } as ApiResponse<string>
})
