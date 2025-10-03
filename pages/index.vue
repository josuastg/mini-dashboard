<template>
  <section>
    <!-- Banner Section -->

    <HeroBanner image="/img/hero_banner.png" />

    <div class="flex flex-col md:flex-row md:items-center md:justify-between my-8 gap-y-4 md:gap-y-0">
      <!-- Kiri (Judul & info) -->
      <div>
        <h2 v-if="!searchQuery.length" class="text-xl font-semibold">All Product</h2>
        <h2 v-else class="text-xl font-normal">
          Search Results For <span class="text-black font-bold">"{{ searchQuery }}"</span>
        </h2>
        <h2 v-if="products.length" class="text-md font-normal">
          Displaying <span class="text-black font-bold">
            1–{{ products.length }}
          </span>
          <span class="text-md font-normal"> of </span>
          <span class="text-black font-bold"> {{ total }} products</span>
        </h2>
      </div>

      <!-- Kanan (Search + Category) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-5/12">
        <SearchBar v-model="searchQuery" @search="handleSearch" />
        <CategoryFilter v-model="selectedCategory" @change="filterByCategory" />
      </div>
    </div>


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

    <!-- Data kosong -->
    <div v-else-if="!products || products.length === 0" class="col-span-full text-center py-10 text-gray-500">
      <Icon icon="mdi:package-variant-remove" class="mx-auto w-12 h-12 mb-2 text-gray-400" />
      <p class="text-lg font-medium">Produk tidak ditemukan</p>
    </div>

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

const { products, total, page, perPage, loading, error, fetchProducts, searchQuery, searchProducts, selectedCategory, filterByCategory } = useProducts()

const handleSearch = async (q: string) => {
  await searchProducts(q)
}
// Handle pagination
const handlePageChange = async (newPage: number) => {
  await fetchProducts(newPage)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const route = useRoute()

watch(
  () => route.query.category,
  (cat: any) => {
    if (cat) {
      filterByCategory(cat as string)
    } else {
      filterByCategory('')
    }
  },
  { immediate: true }
)
</script>
