<script setup lang="ts">
import CategoryTag from '@/components/category-tag/CategoryTag.vue'
import { computed } from '@nuxtjs/composition-api'

interface Props {
  reference?: string
  category?: string
  date: string
  currency: string
  amount: number
  bank?: string
  color?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  reference: 'No reference provided',
})

const reference = computed(() => {
  return !props.reference ? 'No reference provided' : props.reference
})

const date = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleDateString()
})
</script>

<template>
  <div
    class="grid grid-cols-5 border-b-2 py-3 border-gray-100 text-gray-500 text-sm"
  >
    <div :class="!props.reference ? 'text-gray-300' : ''">{{ reference }}</div>
    <CategoryTag :label="props.category" :color="props.color" />
    <div>{{ props.bank }}</div>
    <div>{{ date }}</div>
    <div>{{ props.amount }} {{ props.currency }}</div>
  </div>
</template>
