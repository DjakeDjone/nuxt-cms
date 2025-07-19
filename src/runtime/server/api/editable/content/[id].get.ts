import { defineEventHandler, getRouterParam } from 'h3'
// @ts-ignore
import { createError, useRuntimeConfig } from '#imports'

export default defineEventHandler(event => {
  const id = getRouterParam(event, 'id')??"content"
  const config = useRuntimeConfig()

  const storage = useDefaultStorage()
  const content = storage.getItem(id)

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
  }
})
