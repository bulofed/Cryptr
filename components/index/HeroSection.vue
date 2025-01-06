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
.bg-elm-1 {
  background: rgb(212,255,209);
  background: radial-gradient(circle, rgba(212,255,209,0.5) 0%, rgba(0,212,255,0) 75%); 
}
.bg-elm-2 {
  background: rgb(209,237,255);
  background: radial-gradient(circle, rgba(209,237,255,0.5) 0%, rgba(0,212,255,0) 75%); 
}
</style>

<template>
  <div class="max-w-5xl mx-auto pt-20">
    <div class="bg-radial from-green-200/40 to-white to-75% absolute top-10 right-10 size-[32rem]"/>
    <div class="bg-elm-2 absolute top-20 right-64 size-[42rem]"/>
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
</template>