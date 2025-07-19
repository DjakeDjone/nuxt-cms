import { defineEventHandler, getRouterParam, readBody } from 'h3'
// @ts-ignore
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')??"content"
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const storage = useDefaultStorage()
  
  await storage.setItem(id, body.content)
  
  return { 
    id: id,
    message: 'Content updated successfully', 
    content: body.content 
  }
})
