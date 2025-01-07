<template>
  <a :href="href" class="text-blue-600 hover:underline">{{ text }}</a>
</template>

<script setup>
defineProps({
  href: String,
  text: String
});
</script>