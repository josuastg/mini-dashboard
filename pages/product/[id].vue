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
    <div v-else-if="error" class="text-red-500">Failed to load product</div>
    <div v-else-if="!product" class="text-gray-500">Product not found.</div>

    <!-- Layout utama -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Gambar -->
      <div class="flex justify-center">
        <img :src="product.image" :alt="product.title" class="w-full max-w-sm h-auto object-contain" />
      </div>

      <!-- Detail -->
      <div class="space-y-4">
        <h1 class="text-2xl font-bold">{{ product.title }}</h1>
        <p class="text-2xl font-semibold  text-black">$ {{ product.price }}</p>

        <!-- Rating -->
        <div class="flex items-center text-sm space-x-1">
          <Icon icon="mdi:star" class="text-yellow-500 w-5 h-5" />
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
const { data: product, pending, error } = useProductDetail(route.params.id as string)
</script>
