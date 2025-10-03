<template>
  <div class="max-w-7xl mx-auto px-4 py-8">


    <!-- Title -->
    <h1 class="text-2xl font-bold capitalize">
      {{ decodedName }}
    </h1>

    <!-- Kiri (Judul & info) -->
    <div class="mb-4">
      <h2 v-if="products.length" class="text-md font-normal">
        Displaying <span class="text-black font-bold">
          1–{{ products.length }}
        </span>
        <span class="text-md font-normal"> of </span>
        <span class="text-black font-bold"> {{ total }} products</span>
      </h2>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
      <div v-for="i in perPage" :key="i" class="bg-gray-200 h-64 rounded-lg"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500">Failed to load products</div>

    <!-- Data kosong -->
    <div v-else-if="!products || products.length === 0" class="col-span-full text-center py-10 text-gray-500">
      <Icon icon="mdi:package-variant-remove" class="mx-auto w-12 h-12 mb-2 text-gray-400" />
      <p class="text-lg font-medium">Produk tidak ditemukan</p>
    </div>

    <!-- Grid Produk-->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <!-- Pagination -->
    <div v-if="total > perPage" class="mt-8 flex justify-center">
      <Pagination :current-page="page" :per-page="perPage" :total="total" @page-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// decode nama kategori (karena di encodeURIComponent di breadcrumb)
const decodedName = decodeURIComponent(route.params.name as string)

// state pagination
const page = ref(1)
const perPage = ref(8)

// fetch data category products via composable
const { data, pending, error, refresh } = await useCategoryProducts(decodedName, page.value, perPage.value)

const products = computed(() => data.value?.data || [])
const total = computed(() => data.value?.total || 0)

const handlePageChange = async (newPage: number) => {
  page.value = newPage
  await refresh()
}
</script>
