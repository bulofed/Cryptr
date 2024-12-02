<script setup>
defineProps({
  count: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <div class="flex justify-center">
    <div class="flex gap-4 mt-4">
      <div v-for="i in count" :key="i" class="size-32 bg-neutral-700 rounded-lg"></div>
    </div>
  </div>
</template>