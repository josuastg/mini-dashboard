// server/api/products/[id].ts
export default defineEventHandler(async (event) => {
  const { id }: any = event.context.params

  try {
    const res = await $fetch(`https://fakestoreapi.com/products/${id}`)
    return res
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch product detail'
    })
  }
})