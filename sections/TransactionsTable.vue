<script setup lang="ts">
import SearchText from '@/components/search/SearchText.vue'
import TransactionRow from '@/components/transactions/TransactionRow.vue'
import { filterByBank } from '@/composables/filters'
import { sortDates } from '@/composables/sorters'
import accounts from '@/static/mock-data/accounts.json'
import categories from '@/static/mock-data/categories.json'
import transactions from '@/static/mock-data/transactions.json'

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

const categoryById = (id: string) => {
  const category = categories.find((category) => category.id === id)
  return category?.name
}

const categoryColorById = (id: string) => {
  return categories.find((category) => category.id === id)?.color
}

const bankById = (id: string) => {
  return accounts.find((account) => account.id === id)?.bank
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
    <SearchText
      :transactions="transactions"
      @submit="(searched) => updateFiltered(searched)"
    />
    <div
      class="grid grid-cols-5 border-b-2 border-t-2 py-2 border-gray-200 text-gray-500 text-sm"
    >
      <div>Reference</div>
      <div>Category</div>
      <div class="flex flex-col">
        <label class="ml-1" for="bank-select">Bank</label>
        <select
          v-model="selectedBank"
          class="mr-2"
          name="banks"
          id="bank-select"
          @click="() => filterTransactions('bank')"
        >
          <option value="">Filter by</option>
          <option :value="bank" v-for="bank in arrayOfBanks" :key="bank">
            {{ bank }}
          </option>
        </select>
      </div>

      <div class="flex flex-col">
        <div>Date</div>
        <a class="cursor-pointer" @click="() => filterTransactions('date')"
          >Sort</a
        >
      </div>

      <div>Amount</div>
    </div>

    <div v-for="transaction in transactionsFiltered">
      <TransactionRow
        :date="transaction.date"
        :currency="transaction.currency"
        :amount="transaction.amount"
        :category="categoryById(transaction.categoryId)"
        :color="categoryColorById(transaction.categoryId)"
        :bank="bankById(transaction.accountId)"
        :reference="transaction.reference"
      />
    </div>
  </div>
</template>
