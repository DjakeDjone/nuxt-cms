import { defineEventHandler, getRouterParam, readBody } from 'h3'
// @ts-ignore
import { useRuntimeConfig } from '#imports'
import { useDefaultStorage } from '../../../util/storage'
import { ApiResponse } from '../../../model/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')??"content"
  const body = await readBody(event)

  // TODO: Check auth

  const storage = useDefaultStorage()
  await storage.setItem(id, body.content)
  
  return { 
    id: id,
    message: 'Content updated successfully', 
    content: body.content 
  } as ApiResponse<string>
})
