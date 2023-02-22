<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'

interface Props {
  label: string
  color?: string
}

const props = defineProps<Props>()

const dynamicColor = computed(() => {
  return !props.color
    ? 'bg-orange-300'
    : props.color && props.color.length !== 0 && props.color.startsWith('#')
    ? `bg-[${props.color}]`
    : props.color
})
</script>

<template>
  <div
    class="py-3 px-4 rounded-md min-w-[150px] text-center"
    :class="dynamicColor"
  >
    {{ props.label }}
  </div>
</template>
