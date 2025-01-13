<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSession } from '~/composable/useSession';
import { useUnlockedEnigmas } from '~/composable/useEnigma';

const { user, loadSession } = useSession();
const { enigmes, loading, error, fetchUnlockedEnigmas } = useUnlockedEnigmas();

const router = useRouter();

const goToEnigma = (id) => {
  router.push(`/enigme/${id}`);
};

onMounted(() => {
  loadSession();
  fetchUnlockedEnigmas(user);
});

const sortedEnigmes = computed(() => {
  return [...enigmes.value].sort((a, b) => a.difficultyLevel - b.difficultyLevel)
});
</script>

<template>
<div class="challenges-section text-center p-8">
  <h1 class="text-7xl font-bold mb-10">Challenges</h1>

  <!-- États -->
  <div v-if="loading" class="text-center p-4">
    Chargement...
  </div>
  <div v-else-if="error" class="text-red-500 p-4">
    {{ error }}
  </div>
  <div v-else-if="!enigmes.length" class="text-gray-500 p-4">
    Aucune énigme disponible
  </div>

  <!-- Grille d'énigmes -->
  <div v-else class="challenges-grid grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="enigme in sortedEnigmes" 
        :key="enigme._id" 
        class="challenge-card border border-bl rounded-lg px-12 py-16 bg-zinc-100 dark:bg-zinc-800 shadow-md relative min-h-[240px] transition-all duration-300 transform hover:scale-105"
        :class="{
          'hover:shadow-[4px_4px_0_0_rgba(34,197,94,0.6)]': enigme.difficultyLevel === 0,
          'hover:shadow-[4px_4px_0_0_rgba(234,179,8,0.6)]': enigme.difficultyLevel === 1,
          'hover:shadow-[4px_4px_0_0_rgba(249,115,22,0.6)]': enigme.difficultyLevel === 2,
          'hover:shadow-[4px_4px_0_0_rgba(239,68,68,0.6)]': enigme.difficultyLevel === 3
        }"
        @click="goToEnigma(enigme._id)"
        >

      <!-- Titre et Description -->
      <h2 class="text-4xl font-semibold">{{ enigme.title }}</h2>
      <p class="text-gray-500 mt-6 text-lg">{{ enigme.description }}</p>

      <!-- Statistiques -->
      <div class="stats flex justify-between mt-4 text-sm">
        <div class="flex flex-col justify-center">
          <p class="text-5xl font-bold">{{ enigme.statistics.successRate }}%</p>
          <p class="text-gray-500">Taux de réussite</p>
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-5xl font-bold">{{ enigme.statistics.tries }}%</p>
          <p class="text-gray-500">Tentatives</p>
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-5xl font-bold">{{ enigme.statistics.averageResolutionTime }}%</p>
          <p class="text-gray-500">Temps estimé</p>
        </div>
      </div>

      <!-- Badge de difficulté -->
      <span class="difficulty-tag absolute top-4 right-4 text-sm px-3 py-2 rounded text-white font-medium"
        :class="{
          'bg-green-500': enigme.difficultyLevel === 0,
          'bg-yellow-500': enigme.difficultyLevel === 1,
          'bg-orange-500': enigme.difficultyLevel === 2,
          'bg-red-500': enigme.difficultyLevel === 3
        }"
      >
        {{ enigme.difficultyLevel === 0 ? 'Tutoriel' : 
           enigme.difficultyLevel === 1 ? 'Facile' : 
           enigme.difficultyLevel === 2 ? 'Moyen' : 'Difficile' }}
      </span>
    </div>
  </div>
</div>
</template>

<style scoped>
.challenge-card {
  cursor: pointer;
}
.challenge-card:hover {
  background-color: #f0f0f0; 
}
</style>