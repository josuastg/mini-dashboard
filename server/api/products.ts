export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 8

  // Ambil semua produk dari FakeStore
  const products = await $fetch<any[]>('https://fakestoreapi.com/products')

  // Pagination logic
  const total = products.length
  const start = (page - 1) * perPage
  const paginated = products.slice(start, start + perPage)

  return {
    data: paginated,
    total,
    page,
    perPage,
  }
})
