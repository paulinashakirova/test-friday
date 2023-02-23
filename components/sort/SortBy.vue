<script setup lang="ts">
import accounts from '@/static/mock-data/accounts.json'
import transactions from '@/static/mock-data/transactions.json'
import { computed } from '@nuxtjs/composition-api'
import TransactionRow from '../transactions/TransactionRow.vue'
interface Props {
  bankName?: string | null
}

const props = defineProps<Props>()
// console.log('props', props.bankName)

const findTransactionsByBank = computed(() => {
  if (!props.bankName) {
    return transactions
  } else {
    const bankId = accounts.find(
      (account) => account.bank === props.bankName
    )?.id
    const result = transactions.filter(
      (transaction) => transaction.accountId == bankId
    )
    // console.log('result', result)
    return result
  }
})
</script>
<template>
  <div>
    <div v-for="transaction in findTransactionsByBank">
      <TransactionRow
        :date="transaction.date"
        :currency="transaction.currency"
        :amount="transaction.amount"
      />
    </div>
  </div>
</template>
