import { defineEventHandler, getQuery } from 'h3'
import type { BlogPost } from '~/src/runtime/model/blog'
import { useBlogStorage } from '../../util/storage'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number.parseInt(query.page as string) || 1
  const pageSize = Number.parseInt(query.pageSize as string) || 10
  const searchTerm = (query.q as string)?.toLowerCase()

  const storage = useBlogStorage()
  const keys = await storage.getKeys()
  let blogPosts = (await storage.getItems(keys)).map(item => item.value) as BlogPost[]
  if (searchTerm) {
    blogPosts = blogPosts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm)
        || post.content.toLowerCase().includes(searchTerm)
    })
  }

  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize

  return {
    items: blogPosts.slice(startIndex, endIndex),
    total: blogPosts.length,
  }
})
