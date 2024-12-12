<script setup>
const route = useRoute()

// Liste des routes où le header/footer ne doivent pas s'afficher
const hideLayoutRoutes = ['/inscription', '/connexion']

// Vérifie si on doit cacher le layout
const shouldHideLayout = computed(() => {
  return hideLayoutRoutes.includes(route.path) || route.path.startsWith('/enigme')
})

// Vérifie si on est sur la page Challenge
const isChallengePage = computed(() => {
  return route.path === '/challenge'
})
</script> 

<template>
  <Header 
    v-if="!shouldHideLayout" 
    :isChallengePage="isChallengePage"
  />

  <NuxtPage/>
  
  <Footer v-if="!shouldHideLayout"/>
</template>