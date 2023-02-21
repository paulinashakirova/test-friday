<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
// interface Colors {
//   purple?: ''
//   pink?: ''
//   orange?: ''
//   blue?: ''
//   yellow?: ''
//   lightGray?: ''
//   darkGray?: ''
// }

interface Props {
  label: string
  color: string
}

const props = defineProps<Props>()

const dynamicColor = computed(() => {})
</script>

<template>
  <div class="bg-purple-300 py-3 px-4 w-fit rounded-md">
    {{ props.label }}
  </div>
</template>
