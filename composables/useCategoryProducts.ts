// composables/useCategoryProducts.ts
export const useCategoryProducts = (category: string, page: number, perPage: number) => {
  return useFetch(`/api/products/category/${category}`, {
    query: { page, perPage },
    transform: (res: any) => res,
  })
}
