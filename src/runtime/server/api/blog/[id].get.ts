import { defineEventHandler, getRouterParam, createError } from 'h3'
import { useBlogStorage } from '../../util/storage'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID is required',
        })
    }

    const storage = useBlogStorage()
    const blogPost = await storage.getItem(id)

    if (!blogPost) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Blog post not found',
        })
    }

    return blogPost
})
