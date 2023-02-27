<script setup lang="ts">
import SearchText from '@/components/search/SearchText.vue'
import TransactionRow from '@/components/transactions/TransactionRow.vue'

import { filterByBank } from '@/composables/filter'
import {
  searchBankById,
  searchCategoryById,
  searchCategoryColorById,
} from '@/composables/search'
import { sortDates } from '@/composables/sort'

import accounts from '@/static/mock-data/accounts.json'
import categories from '@/static/mock-data/categories.json'
import transactions from '@/static/mock-data/transactions.json'

import { Transaction } from '@/types/transactions'

import { computed, ref, watch } from '@nuxtjs/composition-api'

const selectedBank = ref('')
const lastSortDirectionAscending = ref(true)
const transactionsFiltered = ref(transactions)

const filterTransactions = (param: 'bank' | 'date') => {
  if (param === 'bank') {
    if (selectedBank.value !== '') {
      transactionsFiltered.value = filterByBank(
        selectedBank.value,
        accounts,
        transactions
      )
    } else {
      transactionsFiltered.value = transactions
    }
  }

  if (param === 'date') {
    transactionsFiltered.value = sortDates(
      transactionsFiltered.value,
      lastSortDirectionAscending.value
    )
    lastSortDirectionAscending.value = !lastSortDirectionAscending.value
  }
  return transactionsFiltered
}

const updateFiltered = (searchResults: Transaction[]) => {
  transactionsFiltered.value = searchResults
}

const arrayOfBanks = computed(() => {
  let bankList = []
  for (let i = 0; i <= accounts.length - 1; i++) {
    bankList.push(accounts[i].bank)
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
          class="border border-gray-300 rounded h-full py-1 px-2"
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
