<script setup lang="ts">
import { performSearch } from '@/composables/search'
import { ref } from '@nuxtjs/composition-api'

interface Props {
  transactions: any
}
interface Emits {
  (e: 'submit', searched: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchString = ref('')

const onSubmit = () => {
  emit('submit', performSearch(searchString.value, props.transactions))
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="transaction-search">Search</label>
    <div class="flex">
      <input
        class="border border-gray-300 rounded min-w-[400px] max-w-[600px] py-1 px-2"
        type="search"
        placeholder="Search by text"
        id="transaction-search"
        name="transaction-search"
        v-model="searchString"
      />
      <button class="border border-gray-300 rounded ml-1 py-1 px-2">
        Search
      </button>
    </div>
  </form>
</template>
