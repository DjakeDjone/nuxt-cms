import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { ApiResponse } from '../../../model/response'
import { useDefaultStorage } from '../../../util/storage'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? 'layout'
  const body = await readBody(event)

  // TODO: Check auth

  const storage = useDefaultStorage()
  await storage.setItem(id, body.content)

  return {
    id: id,
    message: 'Layout updated successfully',
    content: body.content,
  } as ApiResponse<string>
})
