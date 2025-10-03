<template>
  <select v-model="selected" class="rounded-lg border border-gray-300 py-2 px-3 text-sm w-full">
    <option value="">All Categories</option>
    <option v-for="cat in categoryOptions" :key="cat" :value="cat" class="capitalize">
      {{ cat }}
    </option>
  </select>
</template>


<script setup lang="ts">

const props = defineProps<{
  modelValue: string
  categories?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

// fallback default kategori
const defaultCategories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
]

// reactive categories
const categoryOptions = ref(props.categories ?? defaultCategories)

// sync modelValue
const selected = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (val: any) => {
    selected.value = val
  }
)

watch(selected, (val: any) => {
  emit('update:modelValue', val)
  emit('change', val)
})
</script>