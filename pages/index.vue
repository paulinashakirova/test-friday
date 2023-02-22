<script setup lang="ts">
// import categories from '@/static/mock-data/categories.json'

import CategoryTag from '~/components/CategoryTag.vue'
</script>

<template>
  <div>
    <div class="my-20 mx-auto">
      <div class="flex justify-center">
        <CategoryTag label="Advertizing" color="purple" />
        <!-- <div v-for="category in categories" :key="category.id">
      {{ category.name }}
    </div> -->
      </div>
    </div>
  </div>
</template>
