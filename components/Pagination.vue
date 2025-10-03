<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  perPage: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-6">
    <!-- Prev Button -->
    <button
      class="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-700 transition duration-200 ease-in-out disabled:opacity-50 hover:bg-gray-100 hover:text-gray-900"
      :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
      Prev
    </button>

    <!-- Page Numbers -->
    <span v-for="p in totalPages" :key="p">
      <button class="px-3 py-1 rounded-full border border-gray-300 transition duration-200 ease-in-out" :class="p === currentPage
        ? 'bg-gray-500 text-white border-gray-500 shadow-md'
        : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700'" @click="goToPage(p)">
        {{ p }}
      </button>
    </span>

    <!-- Next Button -->
    <button
      class="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-700 transition duration-200 ease-in-out disabled:opacity-50 hover:bg-gray-100 hover:text-gray-900"
      :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
      Next
    </button>
  </div>
</template>
