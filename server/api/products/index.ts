export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 8
  const search = (query.search as string)?.toLowerCase() || ''
  const category = (query.category as string)?.toLowerCase() || ''

  // Ambil semua produk dari FakeStore
  const products = await $fetch<any[]>('https://fakestoreapi.com/products')

  // Filter berdasarkan search (nama produk atau kategori)
  let filtered = products

  if (category) {
    filtered = products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    )
  }

  // Pagination logic
  const total = filtered.length
  const start = (page - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  return {
    data: paginated,
    total,
    page,
    perPage,
  }
})
