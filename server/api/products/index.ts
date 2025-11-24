export const config = {
  runtime: 'nodejs'
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const perPage = Number(query.perPage) || 8
    const search = (query.search as string)?.toLowerCase() || ''
    const category = (query.category as string)?.toLowerCase() || ''

    const products = await $fetch<any[]>('https://fakestoreapi.com/products')

    let filtered = products

    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category)
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      )
    }

    const total = filtered.length
    const start = (page - 1) * perPage
    const paginated = filtered.slice(start, start + perPage)

    return {
      data: paginated,
      total,
      page,
      perPage,
    }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Failed to fetch FakeStore API"
    }))
  }
})
