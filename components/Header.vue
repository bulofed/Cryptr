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
</script>

<template>
  <div
    class="flex items-center justify-between px-16 py-3 z-20 w-full fill-zinc-700 text-zinc-700 dark:text-zinc-200 dark:fill-zinc-200"
  >
    <NuxtLink to="/">
      <IconLogo class="size-12 fill-current text-gray-900 dark:text-white"/>
    </NuxtLink>
    <nav
      class="flex space-x-8 items-center text-base font-sans font-bold"
    >
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <NuxtLink to="/challenge">Challenge</NuxtLink>
      <NuxtLink to="/classement">Classement</NuxtLink>
      <NuxtLink to="/connexion" v-if="!user">Connexion</NuxtLink>
      <button @click="logout" v-else>Déconnexion</button>
      <ThemeSwitch />
    </nav>
  </div>
</template>