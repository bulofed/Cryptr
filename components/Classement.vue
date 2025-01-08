<script setup>
import { onMounted } from 'vue';

const categories = ref([]);
const users = ref([]);

const category = ref('');
const period = ref('');
const difficulty = ref('');

const fetchUsers = async () => {
  try {
    const response = await $fetch('/api/utilisateurs');
    if (response.success && response.data){
      users.value = response.data;
    }
  } catch (err){
    console.error('Erreur lors de la récupération :', err);
  }
};

const matchPeriod = (date) => {
  const now = new Date();
  const dateTime = new Date(date);

  switch (period.value){
    case '0':
      return dateTime.getDate() === now.getDate() && dateTime.getMonth() === now.getMonth() && dateTime.getFullYear() === now.getFullYear();
    case '1':
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return dateTime >= startOfWeek && dateTime <= endOfWeek;
    case '2':
      return dateTime.getMonth() === now.getMonth() && dateTime.getFullYear() === now.getFullYear();
    case '3':
      return true;
    default:
      return true;
  }
};

const filteredUsers = computed(() => {
  return users.value.map(user => {
    const filteredEnigmas = (user.unlockedEnigmas || []).filter(enigma => {
      const matchesCategory = !category.value || category.value === "Toutes" || (enigma.categories || []).includes(category.value);
      const matchesPeriod = !period.value || (enigma.dateCompletion && matchPeriod(enigma.dateCompletion));
      const matchesDifficulty = !difficulty.value || enigma.difficultyLevel == difficulty.value;
      
      return matchesCategory && matchesPeriod && matchesDifficulty;
    });

    const resolvedClues = filteredEnigmas.filter(enigma => enigma.state === "solved");
    const totalTries = resolvedClues.reduce((sum, enigma) => sum + enigma.numberOfTry, 0);
    const averageTime = resolvedClues.length > 0 ? Math.round(resolvedClues.reduce((sum, enigma) => sum + enigma.completionTime, 0) / resolvedClues.length) : 0;

    return {
      username: user.username,
      resolvedCount: resolvedClues.length,
      totalTries,
      averageTime
    };
  });
});

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="flex flex-col items-center min-h-screen">
    <div class="w-full max-w-4xl mt-20 p-3 ">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div class="flex flex-col">

          <select class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
            <option disabled selected value="">Catégorie</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <div class="flex flex-col">
          <select v-model="period" class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
            <option disabled selected value="">Période</option>
            <option value="0">Aujourd'hui</option>
            <option value="1">Cette Semaine</option>
            <option value="2">Ce Mois-ci</option>
            <option value="3">Tout le temps</option>
          </select>
        </div>

        <div class="flex flex-col">
          <select v-model="difficulty" class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
            <option disabled selected value="">Difficulté</option>
            <option value="1">Facile</option>
            <option value="2">Moyenne</option>
            <option value="3">Difficile</option>
          </select>
        </div>
      </div>
      
      <!-- Tableau -->
      <div class="overflow-x-auto">
        <table class="w-full bg-gray-800 text-white rounded-lg shadow-md">
          <thead class="bg-gray-900">
            <tr>
              <th class="py-3 px-4 text-left">Utilisateurs</th>
              <th class="py-3 px-4 text-left">Enigmes résolues</th>
              <th class="py-3 px-4 text-left">Total d'essaies</th>
              <th class="py-3 px-4 text-left">Temps moyen</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in filteredUsers" class="hover:bg-gray-700">
              <td class="py-3 px-4">{{ user.username }}</td>
              <td class="py-3 px-4">{{ user.resolvedCount }}</td>
              <td class="py-3 px-4">{{ user.totalTries }}</td>
              <td class="py-3 px-4">{{ user.averageTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<style></style>
