<script setup>
const route = useRoute()

// Liste des routes où le header/footer ne doivent pas s'afficher
const hideLayoutRoutes = ['/inscription', '/connexion', '/login']

// Vérifie si on doit cacher le layout
const shouldHideLayout = computed(() => {
  return hideLayoutRoutes.includes(route.path) || route.path.startsWith('/enigme')
})

if (import.meta.client) {
  localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white text-zinc-700 dark:bg-zinc-950 dark:text-white antialiased">
    <Header v-if="!shouldHideLayout" />

    <NuxtPage class="flex-1"/>
    
    <Footer v-if="!shouldHideLayout"/>
  </div>
</template>