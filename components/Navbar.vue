<template>
  <header :class="[
    'fixed top-0 left-0 right-0 bg-white z-50 transition-shadow',
    { 'shadow-md': hasShadow }
  ]">
    <nav class="max-w-7xl mx-auto flex items-center justify-between p-4 gap-x-8">
      <!-- Logo -->
      <div class="text-xl cursor-pointer text-black font-bold">
        <NuxtLink :to="{ path: '/' }">
          Mini Store
        </NuxtLink>
      </div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-6 text-gray-700 items-center font-medium">
        <li v-for="item in menuItems" :key="item.name">
          <NuxtLink :to="item.link" :class="[
            'hover:text-black',
            route.params.name === item.param ? 'font-bold text-black' : ''
          ]">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile Hamburger -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <ul v-show="isOpen" class="md:hidden bg-white shadow-md flex flex-col gap-4 p-4 text-gray-700 font-medium">
        <li v-for="item in menuItems" :key="item.name">
          <NuxtLink :to="item.link" @click="closeMenu"
            :class="route.params.name === item.param ? 'font-bold text-black' : ''">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const route = useRoute()

const hasShadow = ref(false)
const isOpen = ref(false)

// Toggle menu mobile
const toggleMenu = () => isOpen.value = !isOpen.value
const closeMenu = () => isOpen.value = false

// Shadow on scroll
const handleScroll = () => {
  hasShadow.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

// Menu items
const menuItems = [
  { name: 'Men', link: `/product/category/${encodeURIComponent(`men's clothing`)}`, param: `men's clothing` },
  { name: 'Women', link: `/product/category/${encodeURIComponent(`women's clothing`)}`, param: `women's clothing` },
  { name: 'Jewelry', link: `/product/category/${encodeURIComponent('jewelery')}`, param: 'jewelery' },
  { name: 'Electronic', link: `/product/category/${encodeURIComponent('electronics')}`, param: 'electronics' }
]
</script>

<style scoped>
:global(body) {
  padding-top: 64px;
}

/* Mobile menu transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
