<template>
  <div class="relative rounded-lg overflow-hidden">
    <!-- Background Image -->
    <img :src="image" alt="Banner" class="w-full h-64 md:h-80 object-center" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>
