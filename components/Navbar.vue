<template>
  <header :class="[
    'fixed top-0 left-0 right-0 bg-white z-50 transition-shadow',
    { 'shadow-md': hasShadow }
  ]">
    <nav class=" max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="text-xl text-gray-600 font-bold text-blackcursor-pointer">
        Mini Store
      </div>

      <!-- Menu -->
      <ul class="flex space-x-6 text-gray-700 font-medium">
        <li>
          <NuxtLink to="/men" class="hover:text-black">Men</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/women" class="hover:text-black">Women</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/jewelry" class="hover:text-black">Jewelry</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/electronics" class="hover:text-black">Electronic</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">

const hasShadow = ref(false)

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
