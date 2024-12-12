<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-4xl mt-20 p-4 ">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="flex flex-col">
                <select class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
                <option disabled selected>Catégorie</option>
                <option>César</option>
                <option>Vigenère</option>
                <option>Substitution</option>
                <option>Base64</option>
                <option>RSA Simple</option>
                <option>RSA avancé</option>
                </select>
            </div>
          <div class="flex flex-col">
            <select class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
            <option disabled selected>Période</option>
              <option>Aujourd'hui</option>
              <option>Cette Semaine</option>
              <option>Ce Mois-ci</option>
              <option>Tout le temps</option>
            </select>
          </div>
          <div class="flex flex-col">
            <select class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
              <option disabled selected>Type</option>
              <option>Individuel</option>
              <option>Par équipe</option>
              <option>Global</option>
            </select>
          </div>
          <div class="flex flex-col">
            <select class="bg-gray-800 border border-gray-300 rounded-lg p-3 h-16 text-xl text-white">
              <option>Facile</option>
              <option>Moyenne</option>
              <option>Difficile</option>
            </select>
          </div>
        </div>
  
        <!-- Tableau -->
        <div class="bg-gray-800 text-white rounded-lg shadow-md p-6 text-center">
          <p class="text-lg font-medium">Tableau stat</p>
        </div>
    </div>
    </div>
  </template>
  
  <script>

  </script>
  
  <style scoped>
  </style>
  