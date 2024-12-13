<script setup>
import { useSession } from '~/composable/useSession'

const { user, loadSession, clearSession } = useSession()

const logout = () => {
  clearSession()
  location.reload()
}

onMounted(() => {
  loadSession()
})

const route = useRoute()

const isIndexRoute = computed(() => route.path === '/')
</script>

<template>
  <div
    class="flex items-center justify-between px-16 py-3 z-20 w-full"
    :class="
      isIndexRoute ? 'absolute top-0' : 'relative'
    ">
    <NuxtLink to="/">
      <IconLogo class="size-12 dark:fill-white"/>
    </NuxtLink>
    <nav class="flex space-x-8 items-center text-base font-sans font-bold">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <NuxtLink to="/challenge">Challenge</NuxtLink>
      <NuxtLink to="/classement">Classement</NuxtLink>
      <NuxtLink to="/connexion" v-if="!user">Connexion</NuxtLink>
      <button @click="logout" v-else>Déconnexion</button>
      <ThemeSwitch />
    </nav>
  </div>
</template>