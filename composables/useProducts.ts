// composables/useProducts.ts
export const useProducts = () => {
  const products = useState<any[]>('products', () => [])
  const total = useState<number>('products_total', () => 0)
  const page = useState<number>('products_page', () => 1)
  const perPage = useState<number>('products_perPage', () => 8)

  const loading = useState<boolean>('products_loading', () => false)
  const error = useState<string | null>('products_error', () => null)

  const searchQuery = useState<string>('products_search', () => '')
  const selectedCategory = useState<string>('products_category', () => '')

  const fetchProducts = async (
    pageNum = page.value,
    query = searchQuery.value,
    category = selectedCategory.value
  ) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ data: any[]; total: number; page: number; perPage: number }>(
        `/api/products?page=${pageNum}&perPage=${perPage.value}&search=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`
      )

      products.value = res?.data ?? []
      total.value = res?.total ?? 0
      page.value = res?.page ?? pageNum
      perPage.value = res?.perPage ?? perPage.value
      searchQuery.value = query
      selectedCategory.value = category
      return res
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to fetch products'
      return null
    } finally {
      loading.value = false
    }
  }

  const searchProducts = async (q: string) => {
    searchQuery.value = q
    return await fetchProducts(1, q, selectedCategory.value)
  }

  const router = useRouter()
  const filterByCategory = async (cat: string) => {
    selectedCategory.value = cat
    router.push({
      path: '/',
      query: {
        ...(searchQuery.value ? { search: searchQuery.value } : {}),
        ...(cat ? { category: cat } : {})
      }
    })
    return await fetchProducts(1, searchQuery.value, cat)
  }

  // SSR fetch
  const { pending, error: initialError } = useAsyncData(
    'products-initial',
    () => fetchProducts(page.value, searchQuery.value, selectedCategory.value),
    { lazy: true }
  )

  // setelah hydration pertama → matikan skeleton
  onMounted(() => {
    if (!pending.value && products.value.length > 0) {
      loading.value = false
    }
  })

  watch(pending, (val) => (loading.value = val))
  watch(initialError, (err) => {
    if (err) error.value = err.message ?? 'Failed to load initial products'
  })

  return {
    products,
    total,
    page,
    perPage,
    loading,
    error,
    searchQuery,
    selectedCategory,
    fetchProducts,
    searchProducts,
    filterByCategory,
  }
}
