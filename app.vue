<script setup>
const route = useRoute()

// Liste des routes où le header/footer ne doivent pas s'afficher
const hideLayoutRoutes = ['/inscription', '/connexion']

// Vérifie si on doit cacher le layout
const shouldHideLayout = computed(() => {
  return hideLayoutRoutes.includes(route.path) || route.path.startsWith('/enigme')
})

// Vérifie si on est sur la page Challenge ou Classement
const isLightThemePage = computed(() => {
  const lightThemeRoutes = ['/challenge', '/classement']
  return lightThemeRoutes.includes(route.path)
})
</script>

<template>
  <Header 
    v-if="!shouldHideLayout" 
    :isChallengePage="isLightThemePage"
  />

  <NuxtPage/>
  
  <Footer v-if="!shouldHideLayout"/>
</template>