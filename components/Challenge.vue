<script setup>
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
  <h1 class="text-5xl font-bold text-center mb-20">Challenges</h1>

  <div v-if="loading" class="text-center">
    Chargement des challenges...
  </div>
  <div v-else-if="error" class="text-center text-red-500">
    {{ error }}
  </div>
  <div v-else-if="!enigmes.length" class="text-center text-gray-500">
    Aucune énigme disponible
  </div>

  <div v-else class="challenges-grid grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="enigme in sortedEnigmes" 
      :key="enigme._id" 
      class="cursor-pointer hover:bg-zinc-50 border border-bl rounded-lg p-4 bg-zinc-100 dark:bg-zinc-800 relative transition-all duration-300 transform hover:scale-105 hover:shadow-[4px_4px_0_0]"
      :class="{
        'hover:shadow-green-500': enigme.difficultyLevel === 0,
        'hover:shadow-yellow-500': enigme.difficultyLevel === 1,
        'hover:shadow-orange-500': enigme.difficultyLevel === 2,
        'hover:shadow-red-500': enigme.difficultyLevel === 3
      }"
      @click="goToEnigma(enigme._id)"
    >
      <h2 class="text-2xl font-semibold">{{ enigme.title }}</h2>
      <p class="text-gray-500 mt-2">{{ enigme.description }}</p>
      <h3 class="text-lg font-bold">Taux de réussite: {{ enigme.statistics.successRate }}%</h3>
    </div>
  </div>
</template>