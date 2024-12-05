<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const enigmes = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchEnigmes = async () => {
  try {
    loading.value = true;
    const response = await $fetch('/api/enigmes');
    console.log('Réponse API:', response);
    
    if (response.success) {
      enigmes.value = response.data;
      console.log('Énigmes chargées:', enigmes.value);
    } else {
      error.value = 'Erreur de chargement';
    }
  } catch (error) {
    console.error('Erreur:', error);
    error.value = 'Erreur lors de la récupération des énigmes';
  } finally {
    loading.value = false;
  }
};

const goToEnigma = (id) => {
  router.push(`/enigme/${id}`);
};

onMounted(() => {
  fetchEnigmes();
});

const sortedEnigmes = computed(() => {
  return [...enigmes.value].sort((a, b) => a.difficultyLevel - b.difficultyLevel)
})
</script>

<template>
<div class="challenges-section text-center p-8 bg-gray-100">
  <h1 class="text-3xl font-bold mb-10">Challenges</h1>

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
  <div class="challenges-grid grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="enigme in sortedEnigmes" 
        :key="enigme._id" 
        class="challenge-card border border-bl rounded-lg p-4 bg-white shadow-md relative min-h-[240px] transition-all duration-300"
        :class="{
          'hover:shadow-[4px_4px_0_0_rgba(34,197,94,0.6)]': enigme.difficultyLevel === 0,
          'hover:shadow-[4px_4px_0_0_rgba(234,179,8,0.6)]': enigme.difficultyLevel === 1,
          'hover:shadow-[4px_4px_0_0_rgba(249,115,22,0.6)]': enigme.difficultyLevel === 2,
          'hover:shadow-[4px_4px_0_0_rgba(239,68,68,0.6)]': enigme.difficultyLevel === 3
        }"
        @click="goToEnigma(enigme._id)"
        >

      <!-- Titre et Description -->
      <h2 class="text-2xl font-semibold">{{ enigme.title }}</h2>
      <p class="text-base text-gray-500 mt-6 text-lg">{{ enigme.description }}</p>

      <!-- Statistiques -->
      <div class="stats flex justify-between mt-4 text-sm">
        <span class="text-center text-xl mt-6">
          {{ enigme.statistics.successRate }}%<br>
          <small class="text-gray-500">Taux de réussite</small>
        </span>
        <span class="text-center text-xl mt-6">
          {{ enigme.statistics.tries }}<br>
          <small class="text-gray-500">Tentatives</small>
        </span>
        <span class="text-center text-xl mt-6">
          {{ enigme.statistics.averageResolutionTime }}s<br>
          <small class="text-gray-500">Temps estimé</small>
        </span>
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
  transition: transform 0.4s;
}

.challenge-card:hover {
  transform: translateY(-15px);
  cursor: pointer;
}

.difficulty-tag {
  font-size: 0.75rem;
}
</style>