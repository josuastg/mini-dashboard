<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb v-if="product" :category="product.category" :title="product.title" />


    <!-- state -->
    <!-- Skeleton Loading -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-pulse">
      <!-- Gambar skeleton -->
      <div class="flex justify-center">
        <div class="w-full max-w-sm h-80 bg-gray-200 rounded-lg"></div>
      </div>

      <!-- Detail skeleton -->
      <div class="space-y-4 w-full">
        <div class="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div class="h-6 w-1/3 bg-gray-200 rounded"></div>
        <div class="flex space-x-2">
          <div class="h-4 w-8 bg-gray-200 rounded"></div>
          <div class="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
        <div class="h-20 w-full bg-gray-200 rounded"></div>
        <div class="h-12 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
    <div v-else-if="error" class="flex flex-col items-center justify-center gap-4 min-h-[40vh] text-center">
      <!-- Icon / ilustrasi error -->
      <svg class="w-32 h-32 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01M4.93 4.93a10 10 0 1114.14 14.14 10 10 0 01-14.14-14.14z" />
      </svg>

      <h2 class="text-2xl font-bold text-gray-600">Failed to Load Product</h2>
      <p class="text-gray-500">There was an error while fetching the product details. Please try again later.</p>

      <div class="flex gap-4 mt-4">
        <NuxtLink to="/" class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
          Back to Home
        </NuxtLink>
        <button @click="retry" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
          Retry
        </button>
      </div>
    </div>

    <div v-else-if="!product" class="flex flex-col items-center gap-4">
      <!-- Ilustrasi / Icon -->
      <svg class="w-32 h-32 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>

      <h2 class="text-2xl font-bold text-gray-700">Product Not Found</h2>
      <p class="text-gray-500">Sorry, we couldn’t find the product you’re looking for.</p>
      <NuxtLink to="/"
        class="mt-4 inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
        Back to Home
      </NuxtLink>
    </div>

    <!-- Layout utama -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Gambar -->
      <div class="flex bg-gray-300 p-10 max-w-max rounded-xl">
        <img :src="product.image" :alt="product.title" class="w-full max-w-sm h-auto object-contain" />
      </div>

      <!-- Detail -->
      <div class="space-y-4">
        <h1 class="text-2xl font-bold">{{ product.title }}</h1>
        <p class="text-2xl font-semibold  text-black">$ {{ product.price }}</p>

        <!-- Rating -->
        <div class="flex items-center text-sm space-x-1">
          <ClientOnly>
            <Icon icon="mdi:star" class="text-yellow-500 w-5 h-5" />
          </ClientOnly>
          <span>{{ product.rating?.rate }}</span>
          <span class="text-gray-500">({{ product.rating?.count }})</span>
        </div>

        <!-- Description -->
        <p class="text-gray-700 leading-relaxed">
          {{ product.description }}
        </p>

        <!-- Action -->
        <button disabled class="w-full bg-gray-200 text-gray-600 font-medium py-3 px-6 rounded-lg cursor-not-allowed">
          Sold out!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: product, pending, error, refresh } = useProductDetail(route.params.id as string)
function retry() {
  refresh() // trigger re-fetch data dari composable
}
</script>
