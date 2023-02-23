<script setup lang="ts">
import SortBy from '@/components/sort/SortBy.vue'
// import TransactionRow from '@/components/transactions/TransactionRow.vue'
import accounts from '@/static/mock-data/accounts.json'
import categories from '@/static/mock-data/categories.json'
import { computed, ref, watchEffect } from '@nuxtjs/composition-api'

const selectedBank = ref(null)

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

watchEffect(() => {
  console.log('selectedBank', selectedBank.value)
})
</script>

<template>
  <div>
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
        >
          <option value="">No filter applied</option>
          <option :value="bank" v-for="bank in arrayOfBanks" :key="bank">
            {{ bank }}
          </option>
        </select>
      </div>
      <div>Date</div>
      <div>Amount</div>
    </div>

    <SortBy :bank-name="selectedBank" />
    <!-- <div
      v-for="{
        reference,
        accountId,
        amount,
        categoryId,
        currency,
        date,
        id,
      } in transactions"
      :key="id"
    >
      <TransactionRow
        :reference="reference"
        :category="categoryById(categoryId)"
        :bank="bankById(accountId)"
        :date="date"
        :currency="currency"
        :amount="amount"
        :color="categoryColorById(categoryId)"
      />
    </div> -->
  </div>
</template>
