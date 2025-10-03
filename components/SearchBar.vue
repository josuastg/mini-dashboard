<template>
  <div class="relative w-full lg:max-w-sm">
    <ClientOnly>
      <input v-model="localValue" type="text" placeholder="Search products..."
        class="w-full rounded-lg border py-2 pl-10 pr-4 text-sm" />
      <span class="absolute left-3 top-2.5 text-gray-400">
        <Icon icon="mdi:magnify" class="w-5 h-5" />
      </span>
      <button v-show="localValue.length > 0" @click="clearInput" type="button"
        class="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'search'])

const localValue = ref('')

// inisialisasi di client
onMounted(() => {
  localValue.value = props.modelValue
})

// watch localValue untuk emit dan debounce
const doSearch = debounce((q: string) => {
  emit('search', q)
}, 500)

watch(localValue, (val) => {
  emit('update:modelValue', val)
  doSearch(val)
})

function clearInput() {
  localValue.value = ''
}
</script>
