<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4">Product List</h2>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="animate-pulse space-y-3">
        <div class="bg-gray-300 rounded-lg h-48 w-full"></div>
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Grid Produk -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <!-- Pagination -->
    <div v-if="total > perPage" class="mt-8 flex justify-center">
      <Pagination :current-page="page" :per-page="perPage" :total="total" @page-change="handlePageChange" />
    </div>
  </section>
</template>

<script setup lang="ts">

const { products, total, page, perPage, loading, error, fetchProducts } = useProducts()

// Handle pagination
const handlePageChange = async (newPage: number) => {
  await fetchProducts(newPage)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
