<script setup lang="ts">
import TransactionRow from '@/components/transactions/TransactionRow.vue'
import accounts from '@/static/mock-data/accounts.json'
import categories from '@/static/mock-data/categories.json'
import transactions from '@/static/mock-data/transactions.json'

const categoryById = (id: string) => {
  const category = categories.find((category) => category.id === id)
  return category?.name
}

const categoryColorById = (id: string) => {
  const category = categories.find((category) => category.id === id)
  console.log('color', category?.color)

  return category?.color
}

const bankById = (id: string) => {
  return accounts.find((account) => account.id === id)?.bank
}
</script>

<template>
  <div>
    <div
      class="grid grid-cols-5 border-b-2 border-t-2 py-2 border-gray-200 text-gray-500 text-sm"
    >
      <div>Reference</div>
      <div>Category</div>
      <div>Bank</div>
      <div>Date</div>
      <div>Amount</div>
    </div>
    <div
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
    </div>
  </div>
</template>
