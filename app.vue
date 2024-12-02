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
  <Header v-if="!shouldHideLayout"/>

  <NuxtPage/>
  
  <Footer v-if="!shouldHideLayout"/>
</template> 