<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'

interface Props {
  reference?: string
  category?: string
  date: string // TO DO: make it a Date
  currency: string
  amount: number
}

const props = withDefaults(defineProps<Props>(), {
  reference: 'No reference provided',
})
const reference = computed(() => {
  return !props.reference ? 'No reference provided' : props.reference
})
</script>

<template>
  <div
    class="grid grid-cols-4 border-b-2 py-3 border-gray-100 text-gray-500 text-sm"
  >
    <div :class="!props.reference ? 'text-gray-300' : ''">{{ reference }}</div>
    <div class="">{{ props.category }}</div>
    <div class="">{{ props.date }}</div>
    <div class="">{{ props.amount }} {{ props.currency }}</div>
  </div>
</template>
