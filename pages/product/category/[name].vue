<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Category: {{ route.params.name }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <Pagination />
  </div>
</template>

<script setup>
const route = useRoute()
const { data: products } = await useFetch(`https://fakestoreapi.com/products/category/${route.params.name}`)
</script>

<style></style>