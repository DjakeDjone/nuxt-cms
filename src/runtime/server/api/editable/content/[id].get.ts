
export default defineEventHandler(event => {
  const id = getRouterParam(event, 'id')

  


  return { id: id, message: 'Content fetched successfully'}
})
