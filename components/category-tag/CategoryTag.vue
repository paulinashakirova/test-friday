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
    ? `background-color: #${props.color || 'fff3da'}`
    : 'background-color: #f4d9fa'
})
</script>

<template>
  <div
    class="py-3 px-4 rounded-md min-w-[100px] max-w-[200px] text-center mx-2"
    :style="dynamicColor"
  >
    {{ props.label }}
  </div>
</template>
