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
//to make search dynamic I can use watch and watch for value in props
// watch(
//   () => props.transactionsFiltered,
//   (transactionsFiltered: any) => {
//     transactionsFiltered.value = performSearch(
//       searchString.value,
//       props.transactionsFiltered
//     )
//   }
// )
const onSubmit = () => {
  emit('submit', performSearch(searchString.value, props.transactions))
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col">
    <label for="transaction-search">Search</label>
    <div class="flex items-center">
      <input
        class="border my-2 border-gray-300 py-2 pl-2 rounded min-w-[400px] max-w-[600px]"
        type="search"
        placeholder="Search by text"
        id="transaction-search"
        name="transaction-search"
        v-model="searchString"
      />
      <button class="border mx-4 border-gray-300 rounded py-2 px-3 h-fit">
        Search
      </button>
    </div>
  </form>
</template>
