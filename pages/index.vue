<script setup>
import { useSession } from '~/composable/useSession'

const { user, loadSession, clearSession } = useSession()

onMounted(() => {
  loadSession()
})
</script>

<template>
    <HeroSection />
    <Carousel />
    <ProjectInfo />
</template>