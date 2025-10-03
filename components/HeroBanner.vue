<template>
  <div class="relative rounded-lg overflow-hidden w-full">
    <!-- Background Image -->
    <img :src="image" alt="Banner"
      class="w-full h-48 sm:h-56 md:h-72 lg:h-96 xl:h-[500px] object-contain transition-all duration-300" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>
