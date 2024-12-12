<script setup>
const route = useRoute()

// Liste des routes où le header/footer ne doivent pas s'afficher
const hideLayoutRoutes = ['/inscription', '/connexion']

// Vérifie si on doit cacher le layout
const shouldHideLayout = computed(() => {
  return hideLayoutRoutes.includes(route.path) || route.path.startsWith('/enigme')
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="!shouldHideLayout" />

    <NuxtPage class="flex-1"/>
    
    <Footer v-if="!shouldHideLayout"/>
  </div>
</template>