<template>
  <div class="relative w-full lg:max-w-sm">
    <input v-model="inputValue" type="text" placeholder="Search products..."
      class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm " />
    <span class="absolute left-3 top-2.5 text-gray-400">
      <Icon icon="mdi:magnify" class="w-5 h-5" />
    </span>
    <button v-if="inputValue" @click="inputValue = ''" type="button"
      class="absolute cursor-pointer right-3 top-2.5 text-gray-400 hover:text-gray-600">
      <Icon icon="mdi:close" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { searchProducts, searchQuery } = useProducts()

// input lokal agar smooth
const inputValue = ref(searchQuery.value)

// debounce call API
const doSearch = debounce(async (q: string) => {
  await searchProducts(q)
}, 500) // 500ms jeda

// trigger ketika user mengetik
watch(inputValue, (val: any) => {
  doSearch(val)
})
</script>
