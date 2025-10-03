<template>
  <NuxtLink :to="`/product/${product.id}`"
    class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
    <div class="bg-gray-300 p-4">
      <img :src="product.image" alt="" class="w-full h-36 object-contain" />
    </div>
    <div class="px-4 py-3">
      <p class="text-gray-700 text-sm font-normal capitalize">{{ categories }}</p>
      <h3 class="font-semibold mt-2 text-sm line-clamp-2">{{ product.title }}</h3>
      <p class="text-black font-bold mt-1">$ {{ product.price }}</p>
    </div>

  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true }
})

const categories = computed(() => {
  let result = '';
  console.log(props.product.category)
  switch (props.product.category) {
    case "men's clothing":
      result = 'Men';
      break;
    case "women's clothing":
      result = 'Women';
      break;
    case "electronics":
      result = 'Electronic';
      break;
    case "jewelery":
      result = 'Jewelry';
      break;
    default:
      result = '';
      break;
  }
  return result
})
</script>

<style></style>