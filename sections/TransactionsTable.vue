<script setup lang="ts">
import SearchText from '@/components/search/SearchText.vue'
import TransactionRow from '@/components/transactions/TransactionRow.vue'
import {
  searchBankById,
  searchCategoryById,
  searchCategoryColorById,
} from '@/composables/search'
import { sortDates } from '@/composables/sort'
import accounts from '@/static/mock-data/accounts.json'
import categories from '@/static/mock-data/categories.json'
import transactions from '@/static/mock-data/transactions.json'
import { filterByBank } from '~/composables/filter'

import { computed, ref, watch } from '@nuxtjs/composition-api'

const selectedBank = ref('')
const sortByDate = ref(true)

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
    sortByDate.value = !sortByDate.value
    transactionsFiltered.value = sortDates(transactionsFiltered.value)
  }
  return transactionsFiltered
}

const updateFiltered = (searchResults: any) => {
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
    <div class="flex">
      <SearchText
        :transactions="transactions"
        @submit="(searched) => updateFiltered(searched)"
      />
      <div class="flex flex-col text-gray-500 ml-6">
        <label class="" for="bank-select">Bank</label>
        <div class="flex items-center">
          <!--fix height difference of 0.5px -->
          <select
            v-model="selectedBank"
            class="border my-2 border-gray-300 py-2 pl-2 rounded"
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
      </div>

      <div class="flex flex-col text-gray-500 ml-6">
        <div>Date</div>
        <a
          class="cursor-pointer border border-gray-200 rounded px-2 py-2 my-2"
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
      <div>Date</div>

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
