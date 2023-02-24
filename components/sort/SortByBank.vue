<script setup lang="ts">
import accounts from '@/static/mock-data/accounts.json'
import transactions from '@/static/mock-data/transactions.json'
import { computed } from '@nuxtjs/composition-api'

interface Props {
  bankName?: string | null
}

const props = defineProps<Props>()

const findTransactionsByBank = computed(() => {
  if (!props.bankName || props.bankName === '') {
    return transactions
  } else {
    const bankId = accounts.find(
      (account) => account.bank === props.bankName
    )?.id
    const result = transactions.filter(
      (transaction) => transaction.accountId == bankId
    )
    return result
  }
})
</script>

<template>
  <div>
    <div v-for="transaction in findTransactionsByBank">
      <slot :transaction="transaction" />
    </div>
  </div>
</template>
