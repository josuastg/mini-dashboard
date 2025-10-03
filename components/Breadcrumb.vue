<template>
  <nav class="flex text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
    <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
    <span class="mx-2">/</span>
    <NuxtLink :to="`/product/category/${encodeURIComponent(category)}`" class="hover:underline capitalize">
      {{ category }}
    </NuxtLink>
    <span class="mx-2">/</span>
    <span class="text-gray-700 font-medium truncate max-w-xs">{{ title }}</span>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  category: string
  title: string
}>()
</script>
