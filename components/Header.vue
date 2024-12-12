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
const isSpecialRoute = computed(() => route.path === '/challenge' || route.path === '/classement' || route.path === '/dashboard')
</script>

<template>
  <div
    class="flex items-center justify-between px-16 py-3 z-20 w-full"
    :class="[
      isIndexRoute ? 'absolute top-0 text-white fill-white' : 'relative text-black fill-black',
      isSpecialRoute ? 'bg-gray-100' : ''
    ]">
    <NuxtLink to="/">
      <IconLogo class="size-12"/>
    </NuxtLink>
    <nav class="flex space-x-8 text-base font-sans">
      <NuxtLink to="/dashboard"><b>Dashboard</b></NuxtLink>
      <NuxtLink to="/challenge"><b>Challenge</b></NuxtLink>
      <NuxtLink to="/classement"><b>Classement</b></NuxtLink>
      <NuxtLink to="/connexion" v-if="!user"><b>Connexion</b></NuxtLink>
      <button @click="logout" v-else>Déconnexion</button>
    </nav>
  </div>
</template>