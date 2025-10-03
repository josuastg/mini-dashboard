<template>
  <header :class="[
    'fixed top-0 left-0 right-0 bg-white z-50 transition-shadow',
    { 'shadow-md': hasShadow }
  ]">
    <nav class="max-w-7xl mx-auto flex items-center p-4 gap-x-8">
      <!-- Logo -->
      <div class="text-xl cursor-pointer text-black font-bold">
        <NuxtLink :to="{ path: '/' }">
          Mini Store
        </NuxtLink>
      </div>

      <!-- Menu -->
      <ul class="flex space-x-6 text-gray-700 items-center font-medium">
        <li>
          <NuxtLink :to="{ path: '/', query: { category: 'men\'s clothing' } }" :class="[
            'hover:text-black',
            route.query.category === `men's clothing` ? 'font-bold text-black' : ''
          ]">
            Men
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/', query: { category: 'women\'s clothing' } }" :class="[
            'hover:text-black',
            route.query.category === `women's clothing` ? 'font-bold text-black' : ''
          ]">
            Women
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/', query: { category: 'jewelery' } }" :class="[
            'hover:text-black',
            route.query.category === 'jewelery' ? 'font-bold text-black' : ''
          ]">
            Jewelry
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/', query: { category: 'electronics' } }" :class="[
            'hover:text-black',
            route.query.category === 'electronics' ? 'font-bold text-black' : ''
          ]">
            Electronic
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">

const hasShadow = ref(false)
const route = useRoute();
const handleScroll = () => {
  hasShadow.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
/* biar konten ga ketutup navbar */
:global(body) {
  padding-top: 64px;
  /* sesuaikan dengan tinggi navbar */
}
</style>
