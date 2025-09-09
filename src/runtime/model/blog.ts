

export type BlogPost = {
    id: string
    title: string
    content: string
    author: string
    createdAt: Date
    updatedAt: Date
    tags?: string[]
}

export const defaultBlogPost = (): CreateBlogPost => ({
    title: "New Post",
    content: "",
    author: "Author Name",
    tags: ["tag1", "tag2"]
})

export type CreateBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>