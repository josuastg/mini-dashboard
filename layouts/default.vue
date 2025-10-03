<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Navbar />

    <!-- Content -->
    <main class="max-w-7xl flex-1 container mx-auto p-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 text-center p-4 text-sm text-gray-500">
      © 2025 Mini Store
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>