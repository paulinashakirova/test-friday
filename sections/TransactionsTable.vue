<script setup lang="ts">
import SearchText from '@/components/search/SearchText.vue'
import TransactionRow from '@/components/transactions/TransactionRow.vue'

import { fetchAllAccounts } from '@/composables/use-accounts'
import { fetchAllCategories } from '@/composables/use-categories'
import { fetchAllTransactions } from '@/composables/use-transactions'

import { filterByBank } from '@/lib/utils/filter'
import {
  searchBankById,
  searchCategoryById,
  searchCategoryColorById,
} from '@/lib/utils/search'
import { sortDates } from '@/lib/utils/sort'

import { Transaction } from '@/types/transactions'

import { computed, onBeforeMount, ref, watch } from '@nuxtjs/composition-api'

const selectedBank = ref('')
const lastSortDirectionAscending = ref(true)
const categories = ref<any>([])
const accounts = ref<any>([])
const transactions = ref<any>([])

const transactionsFiltered = ref()

onBeforeMount(async () => {
  categories.value = await fetchAllCategories()
  accounts.value = await fetchAllAccounts()
  transactions.value = await fetchAllTransactions()
  transactionsFiltered.value = await fetchAllTransactions() //to set the default data initially, and prevent the direct mutation of it later on (Before I had const transactionsFiltered = ref(transactions) and it would not allow me to reset all results when the search string was empty)
})

const filterTransactions = (param: 'bank' | 'date') => {
  if (param === 'bank') {
    if (selectedBank.value !== '') {
      transactionsFiltered.value = filterByBank(
        selectedBank.value,
        accounts.value,
        transactions.value
      )
    } else {
      transactionsFiltered.value = transactions.value
    }
  }

  if (param === 'date') {
    transactionsFiltered.value = sortDates(
      transactionsFiltered.value,
      lastSortDirectionAscending.value
    )
    lastSortDirectionAscending.value = !lastSortDirectionAscending.value
  }
  return transactionsFiltered.value
}

const updateFiltered = (searchResults: Transaction[]) => {
  transactionsFiltered.value = searchResults
}

const arrayOfBanks = computed(() => {
  let bankList = []
  for (let i = 0; i <= accounts.value.length - 1; i++) {
    bankList.push(accounts.value[i].bank)
  }
  return new Set(bankList)
})

watch(selectedBank, () => {
  filterTransactions('bank')
})
</script>

<template>
  <div>
    <div class="flex mb-2 gap-x-4">
      <SearchText
        class="flex flex-col text-gray-500"
        :transactions="transactions"
        @submit="(searched) => updateFiltered(searched)"
      />
      <div class="flex flex-col text-gray-500">
        <label for="bank-select">Bank</label>
        <select
          v-model="selectedBank"
          class="border border-gray-300 rounded h-full py-1 px-2 w-52"
          name="banks"
          id="bank-select"
          @click="() => filterTransactions('bank')"
        >
          <option value="">No filter applied</option>
          <option :value="bank" v-for="bank in arrayOfBanks" :key="bank">
            {{ bank }}
          </option>
        </select>
      </div>
      <div class="flex flex-col text-gray-500">
        <div>Date</div>
        <a
          class="cursor-pointer border border-gray-300 rounded py-1 px-2"
          @click="() => filterTransactions('date')"
          >Sort</a
        >
      </div>
    </div>

    <div
      class="grid grid-cols-5 border-b-2 border-t-2 py-2 border-gray-200 text-gray-500 text-sm"
    >
      <div>Reference</div>
      <div>Category</div>
      <div>Bank</div>
      <div
        class="flex gap-x-2 cursor-pointer group"
        @click="() => filterTransactions('date')"
      >
        <div>Date</div>
        <svg
          width="9"
          height="12"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="self-center"
          :class="
            lastSortDirectionAscending === true ? 'rotate-90' : '-rotate-90'
          "
        >
          <path
            d="M1.56957 2L7.5 7.96501L1.5 14"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-gray-500"
          />
        </svg>
      </div>

      <div>Amount</div>
    </div>

    <div v-for="transaction in transactionsFiltered">
      <TransactionRow
        :date="transaction.date"
        :currency="transaction.currency"
        :amount="transaction.amount"
        :category="searchCategoryById(transaction.categoryId, categories)"
        :color="searchCategoryColorById(transaction.categoryId, categories)"
        :bank="searchBankById(transaction.accountId, accounts)"
        :reference="transaction.reference"
      />
    </div>
  </div>
</template>
