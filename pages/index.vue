<template>
  <div>
    Hello
    <div v-for="category in categories" :key="category.id">
      {{ category.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import categories from '@/static/mock-data/categories.json'
</script>
