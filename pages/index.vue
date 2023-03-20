<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { onMounted, ref } from '@nuxtjs/composition-api';
// import TransactionsTable from '@/sections/TransactionsTable.vue'

const transactions = ref([]) as any;

async function getTransactions() {
  let { data: Account, error } = await supabase.from('Account').select('*');

  transactions.value = Account;
}

onMounted(() => {
  getTransactions();
});
</script>

<template>
  <div class="mx-10 mt-10">
    <h1>Hello world</h1>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.accountId">
        {{ transaction }}
      </li>
    </ul>
    <!-- <TransactionsTable /> -->
  </div>
</template>
