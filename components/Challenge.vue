<script setup>
import { ref, onMounted } from 'vue'

const enigmes = ref([])
const loading = ref(true)
const error = ref(null)

const fetchEnigmes = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/enigmes')
    console.log('Réponse API:', response)
    
    if (response.success) {
      enigmes.value = response.data
      console.log('Énigmes chargées:', enigmes.value)
    } else {
      error.value = 'Erreur de chargement'
    }
  } catch (error) {
    console.error('Erreur:', error)
    error.value = 'Erreur lors de la récupération des énigmes'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEnigmes()
})
</script>

<template>
<div class="challenges-section text-center p-8">
  <h1 class="text-3xl font-bold mb-8">Challenges</h1>

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
    <div v-for="enigme in enigmes" 
         :key="enigme._id" 
         class="challenge-card border rounded-lg p-4 bg-white shadow-md relative">
      
      <!-- Titre et Description -->
      <h2 class="text-xl font-semibold">{{ enigme.title }}</h2>
      <p class="text-sm text-gray-500 mt-2">{{ enigme.textInspect }}</p>


      <!-- Statistiques -->
      <div class="stats flex justify-between mt-4 text-sm">
        <span class="text-center">
          {{ enigme.statistics.successRate }}%<br>
          <small class="text-gray-500">Taux de réussite</small>
        </span>
        <span class="text-center">
          {{ enigme.statistics.tries }}<br>
          <small class="text-gray-500">Tentatives</small>
        </span>
        <span class="text-center">
          {{ enigme.statistics.averageResolutionTime }}s<br>
          <small class="text-gray-500">Temps estimé</small>
        </span>
      </div>

      <!-- Badge de difficulté -->
      <span class="difficulty-tag absolute top-4 right-4 text-xs px-2 py-1 rounded text-white"
            :class="{
              'bg-green-500': enigme.difficultyLevel === 0,
              'bg-yellow-500': enigme.difficultyLevel === 1,
              'bg-orange-500': enigme.difficultyLevel === 2,
              'bg-red-500': enigme.difficultyLevel === 3
            }">
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
  transition: transform 0.2s;
}

.challenge-card:hover {
  transform: translateY(-5px);
}

.difficulty-tag {
  font-size: 0.75rem;
}
</style>