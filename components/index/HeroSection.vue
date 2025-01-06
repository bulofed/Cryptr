<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const user = inject('user')
const router = useRouter()

const handleStartChallenge = () => {
  if (user.value) {
    router.push('/challenge')
  } else {
    router.push('/connexion')
  }
}
</script>

<style scoped>
.radial-1 {
  background: radial-gradient(circle, #10b981 0%, #ffffff00 75%);
}
.radial-2 {
  background: radial-gradient(circle, #f43f5e 0%, #ffffff00 75%);
}
.radial-3 {
  background: radial-gradient(circle, #f59e0b 0%, #ffffff00 75%);
}
</style>

<template>
  <div class="max-w-5xl mx-auto pt-20 relative">
    <div class="absolute left-[40rem] -bottom-32 size-[50rem] radial-1 opacity-40 dark:opacity-20"/>
    <div class="absolute right-[20rem] top-12 size-[65rem] radial-2 opacity-40 dark:opacity-20"/>
    <div class="absolute left-48 bottom-32 size-[35rem] radial-3 opacity-40 dark:opacity-20"/>
    <div class="relative">
      <h1 class="flex text-center font-extrabold tracking-tight text-6xl text-zinc-900 dark:text-white">
        Serez-vous capable de résoudre les énigmes ?
      </h1>

      <div class="flex justify-center gap-20 font-code text-center pt-20">
        <div>
          <p class="text-9xl font-bold">1</p>
          <p class="text-4xl">Équipes actives</p>
        </div>
        <div>
          <p class="text-9xl font-bold">1</p>
          <p class="text-4xl">Cryptanalyses complétées</p>
        </div>
        <div>
          <p class="text-9xl font-bold">2</p>
          <p class="text-4xl">Défis disponibles</p>
        </div>
      </div>

      <div class="flex justify-center pt-20">
        <a
          @click="handleStartChallenge"
          class="py-4 px-6 rounded-lg bg-zinc-900 hover:bg-zinc-700 dark:bg-sky-500 dark:hover:bg-sky-400 flex transition text-white font-semibold cursor-pointer">
          Commencer le challenge
        </a>
      </div>
    </div>
  </div>
</template>