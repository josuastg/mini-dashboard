// composables/useProducts.ts
export const useProducts = () => {
  const products = useState<any[]>('products', () => [])
  const total = useState<number>('products_total', () => 0)
  const page = useState<number>('products_page', () => 1)
  const perPage = useState<number>('products_perPage', () => 8)

  const loading = useState<boolean>('products_loading', () => true) // default: true
  const error = useState<string | null>('products_error', () => null)

  const fetchProducts = async (pageNum = page.value) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ data: any[]; total: number; page: number; perPage: number }>(
        `/api/products?page=${pageNum}&perPage=${perPage.value}`
      )

      products.value = res?.data ?? []
      total.value = res?.total ?? 0
      page.value = res?.page ?? pageNum
      perPage.value = res?.perPage ?? perPage.value
      return res
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to fetch products'
      return null
    } finally {
      loading.value = false
    }
  }

  // SSR fetch
  const { pending, error: initialError } = useAsyncData(
    'products-initial',
    () => fetchProducts(page.value),
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

  return { products, total, page, perPage, loading, error, fetchProducts }
}
