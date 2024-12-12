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

<template>
  <div class="flex flex-col justify-between h-screen w-min-screen bg-hero py-40">
    <h1 class="flex text-white z-10 text-center font-bold px-40 text-5xl">
      Déchiffrez l'impossible,<br>Rejoignez l'élite 🚀
    </h1>

    <div class="flex justify-center gap-20 text-white z-10 text-center">
      <div>
        <p class="text-9xl font-bold">16</p>
        <p class="text-4xl">Équipes actives</p>
      </div>
      <div>
        <p class="text-9xl font-bold">120</p>
        <p class="text-4xl">Cryptanalyses complétées</p>
      </div>
      <div>
        <p class="text-9xl font-bold">32</p>
        <p class="text-4xl">Défis disponibles</p>
      </div>
    </div>

    <div class="flex justify-center z-10">
      <button
        @click="handleStartChallenge"
        class="py-2 px-6 w-80 h-16 rounded-full text-white bg-cyan-600 hover:bg-red-700 text-xl text-center flex items-center justify-center">
        Commencer le challenge
      </button>
    </div>
  </div>
</template>

<style scoped>
.bg-hero {
  background-image: url('/background_index.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>