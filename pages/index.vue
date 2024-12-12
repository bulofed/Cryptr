<script setup>
import { useSession } from '~/composable/useSession'
import { provide, ref, onMounted } from 'vue'

const { user, loadSession } = useSession()
const isSessionLoaded = ref(false)

onMounted(async () => {
  await loadSession()
  isSessionLoaded.value = true
})

provide('user', user)
provide('isSessionLoaded', isSessionLoaded)
</script>

<template>
  <div v-if="isSessionLoaded">
    <HeroSection />
    <Carousel />
    <ProjectInfo />
  </div>
  <div v-else>
    Loading...
  </div>
</template>