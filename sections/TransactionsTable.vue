<script setup lang="ts">
import TransactionRow from '@/components/transactions/TransactionRow.vue'
import transactions from '@/static/mock-data/transactions.json'
</script>

<template>
  <div>
    <div
      class="grid grid-cols-4 border-b-2 border-t-2 py-2 border-gray-200 text-gray-500 text-sm"
    >
      <div class="">Reference</div>
      <div class="">Category</div>
      <div class="">Date</div>
      <div class="">Amount</div>
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
        category="tbc"
        :date="date"
        :currency="currency"
        :amount="amount"
      />
    </div>
  </div>
</template>
