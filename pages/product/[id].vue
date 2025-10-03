<template>
  <div>
    <NuxtLink to="/" class="text-blue-500 underline">&larr; Back</NuxtLink>
    <div v-if="product" class="mt-4">
      <img :src="product.image" alt="" class="w-64 h-64 object-contain mx-auto" />
      <h2 class="text-xl font-bold mt-4">{{ product.title }}</h2>
      <p class="text-gray-600">{{ product.description }}</p>
      <p class="text-lg font-semibold mt-2">$ {{ product.price }}</p>
      <p class="mt-1">Category:
        <NuxtLink :to="`/category/${product.category}`" class="text-blue-500 underline">
          {{ product.category }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: product } = await useFetch(`https://fakestoreapi.com/products/${route.params.id}`)
</script>

<style></style>