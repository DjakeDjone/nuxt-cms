import { defineEventHandler, createError } from 'h3'
import { useImageStorage } from '../../../util/storage'
import type { FileItem } from '../../../model/file'
import { getRouterParam, setHeader } from '#imports'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name parameter is required',
    })
  }

  const storage = useImageStorage()
  const file = await storage.getItem<FileItem>(name)

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${name}`,
    })
  }

  // Set the appropriate headers for the file download
  setHeader(event, 'Content-Disposition', `attachment; filename="${name}"`)
  setHeader(event, 'Content-Type', file.type || 'application/octet-stream')
  setHeader(event, 'Content-Length', file.size)

  return file.data
})
