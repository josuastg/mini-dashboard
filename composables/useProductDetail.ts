// composables/useProductDetail.ts
export const useProductDetail = (id: string | number) => {
  return useFetch(`/api/products/${id}`, {
    key: `product-${id}`
  })
}
