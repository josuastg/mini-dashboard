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
    <button class="px-3 py-1 border rounded disabled:opacity-50" :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)">
      Prev
    </button>

    <!-- Page Numbers -->
    <span v-for="p in totalPages" :key="p">
      <button class="px-3 py-1 border rounded"
        :class="p === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'" @click="goToPage(p)">
        {{ p }}
      </button>
    </span>

    <!-- Next Button -->
    <button class="px-3 py-1 border rounded disabled:opacity-50" :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)">
      Next
    </button>
  </div>
</template>
