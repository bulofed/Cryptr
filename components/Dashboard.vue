<template>
    <div class="text-white font-sans min-h-screen flex flex-col">
      <div class="p-6 flex-1 max-w-6xl mx-auto">
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <!-- Div pour les scores global -->
          <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center my-4"> 
            <div class="text-yellow-400 text-2xl">🏆</div>
            <div class="text-3xl font-bold">3200</div>
            <div class="text-gray-400">Score Global</div>
          </div>
          <!-- Div pour les challenges complétés -->
          <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center my-4"> 
            <div class="text-purple-400 text-2xl">🧠</div>
            <div class="text-3xl font-bold">4/48</div>
            <div class="text-gray-400">Challenges Complétés</div>
          </div>
          <!-- Div pour le temps moyen -->
          <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center my-4">
            <div class="text-green-400 text-2xl">⏱</div>
            <div class="text-3xl font-bold">1m32</div>
            <div class="text-gray-400">Temps Moyen</div>
          </div>
          <!-- Div pour les indices -->
          <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center my-4"> 
            <div class="text-red-400 text-2xl">💡</div>
            <div class="text-3xl font-bold">1</div>
            <div class="text-gray-400">Indices Utilisés</div>
          </div>
        </div>
  
        <!-- Detailed Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"> 
            <!-- Div pour les points -->
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-bold">Points</h3>
            <div class="h-24 flex items-center justify-center text-gray-500">
            </div>
          </div>
  
          <!-- Div pour les statistiques -->
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-bold">Statistiques</h3>
            <ul class="mt-6 space-y-8"> 
              <li class="flex items-center justify-between">
                <span class="text-blue-400">🔒 Crypto</span>
                <span class="font-bold">8/10</span>
              </li>
              <li class="flex items-center justify-between">
                <span class="text-green-400">🛡 Web Security</span>
                <span class="font-bold">3/10</span>
              </li>
              <li class="flex items-center justify-between">
                <span class="text-red-400">📈 Réussite</span>
                <span class="font-bold">85%</span>
              </li>
            </ul>
          </div>
        </div>

        <!--Div pour les derniers challenges-->
        <div class="mt-8 bg-gray-800 rounded-lg h-40">
          <h3 class="text-lg font-bold px-6 py-2">Derniers Challenges</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4">
            <div class="bg-gray-600 p-2 rounded-lg flex items-center justify-between">
              <span>Vigenère</span>
              <span class="text-yellow-400">En cours</span>
            </div>
            <div class="bg-gray-500 p-2 rounded-lg flex items-center justify-between">
              <span>XSS</span>
              <span class="text-green-400">Terminé</span>
            </div>
            <div class="bg-gray-500 p-2 rounded-lg flex items-center justify-between">
              <span>SQL Injection</span>
              <span class="text-green-400">Terminé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  </script>
  
  <style>
  </style>
  