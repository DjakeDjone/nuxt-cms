import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { BlogPost, CreateBlogPost } from '~/src/runtime/model/blog'
import { useBlogStorage } from '../../util/storage'

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateBlogPost>(event)
    const id = getRouterParam(event, 'id') ?? Math.random().toString(36).substring(2, 15)

    const storage = useBlogStorage()

    storage.setItem(id, { ...body, id } as BlogPost);

    return {
        id: id,
        message: 'Content updated successfully',
        content: { ...body, id } as BlogPost,
    }
})