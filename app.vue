<template>
  <div class="[&_*]:text-slate-50 [&_*]:stroke-slate-50 bg-neutral-900 min-h-screen">
    <Header v-if="name !== 'enigme-id'"/>
    
    <NuxtPage />

    <Footer v-if="name === 'index'"/>
  </div>
</template>

<script setup>
const { name } = useRoute()
</script>