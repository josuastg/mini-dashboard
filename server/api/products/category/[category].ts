export default defineEventHandler(async (event) => {
  const { category } = event.context.params!
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 8

  // Ambil produk dari FakeStore API by category
  const products = await $fetch<any[]>(`https://fakestoreapi.com/products/category/${category}`)

  // Pagination logic
  const total = products.length
  const start = (page - 1) * perPage
  const paginated = products.slice(start, start + perPage)

  return {
    data: paginated,
    total,
    page,
    perPage,
    category,
  }
})
