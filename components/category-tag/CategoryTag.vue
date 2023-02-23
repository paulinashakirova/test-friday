<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'

interface Props {
  label?: string
  color?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  label: 'No category',
})

const dynamicColor = computed(() => {
  return typeof props.color === 'string'
    ? `bg-[#${props.color}]`
    : 'bg-gray-100'
})
</script>

<template>
  <div
    class="py-3 px-4 rounded-md min-w-[100px] max-w-[200px] text-center"
    :class="dynamicColor"
  >
    {{ props.label }}
  </div>
</template>
