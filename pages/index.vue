<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSession } from '~/composable/useSession'

const { user, loadSession, clearSession } = useSession()

const currentSlide = ref(0)
const slides = ref(3) 
const slideInterval = ref(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value
  updateSlidePosition()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value) % slides.value
  updateSlidePosition()
}

const goToSlide = (index) => {
  currentSlide.value = index
  updateSlidePosition()
}

const updateSlidePosition = () => {
  const container = document.querySelector('.flex.transition-transform')
  if (container) {
    container.style.transform = `translateX(-${currentSlide.value * 100}%)`
  }
}

const startAutoSlide = () => {
  slideInterval.value = setInterval(nextSlide, 5000) // Change de slide toutes les 5 secondes
}

const stopAutoSlide = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
}

const logout = () => {
  clearSession()
  location.reload() // Reload the page to reflect the changes
}

onMounted(() => {
  loadSession()
  updateSlidePosition()
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<template>
    <div class="flex flex-col justify-between h-screen w-min-screen bg-hero py-40">
        <h1 class="flex text-white z-10 text-center font-bold px-40 text-5xl">
            Déchiffrez l'impossible,<br>Rejoignez l'élite 🚀
        </h1>

        <!-- Statistiques -->
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
            <router-link
                to="/connexion"
                class="py-2 px-6 w-80 h-16 rounded-full text-white bg-cyan-600 hover:bg-red-700 text-xl text-center flex items-center justify-center">
                Commencer le challenge
            </router-link>
        </div>
    </div>


<!--Carrousel temporaire -->
<div class="relative w-full overflow-hidden h-140">
    <!-- Container du carrousel -->
    <div class="flex transition-transform duration-500 ease-in-out">
        <div class="w-full flex-shrink-0">
            <img src="@/public/Logo_Lock.jpg" alt="Slide 1" class="w-full h-96 object-cover">
        </div>
        <div class="w-full flex-shrink-0">
            <img src="@/public/background_index.jpg" alt="Slide 2" class="w-full h-96 object-cover">
        </div>
        <div class="w-full flex-shrink-0">
            <img src="@/public/hard.png" alt="Slide 3" class="w-full h-96 object-cover">
        </div>
    </div>

        <!-- Boutons de navigation-->
        <button 
            @click="prevSlide" 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-75 z-20 cursor-pointer">
            &#8592;
        </button>
        <button 
            @click="nextSlide" 
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-75 z-20 cursor-pointer">
            &#8594;
        </button>

        <!-- Indicateurs -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            <button 
                v-for="n in slides" 
                :key="n" 
                @click="goToSlide(n-1)"
                :class="['w-3 h-3 rounded-full bg-white', currentSlide === n-1 ? 'opacity-100' : 'opacity-50']">
            </button>
        </div>
</div>
<!--Fin du carrousel-->

<!-- Information du projet -->
<div class="bg-black w-full min-h-screen pb-20"> 
    <div class="text-white text-3xl text-center font-bold pt-10">
        <h1>Comment ça marche ? </h1>
    </div>

    <div class="flex justify-center items-center gap-20 px-20 py-40 text-xl">
        <!-- Colonne de gauche-->
        <div class="flex-1 shadow-lg shadow-cyan-500/100 rounded-lg p-6 bg-neutral-900">
            <p class="text-white max-w-xl">
                Le but du projet est de créer une plateforme web dédiée à la résolution 
                d'énigmes centrées sur la cryptographie.
            </p>
            <br>
            <p class="text-white max-w-xl">Cette plateforme permettra aux utilisateurs de s’authentifier,
                 de suivre leurs progrès, et de comptabiliser leurs tentatives avant réussite.
            </p>
            <br>
            <p class="text-white max-w-xl">Chaque énigme résolue rapportera des points, ajustés selon l’utilisation d’indices, et les utilisateurs pourront se regrouper en équipes pour participer à des compétitions avec un classement général.</p>
        </div>

        <!-- Colonne de droite -->
        <div class="w-2/5 shadow-lg shadow-fuchsia-600/100 rounded-lg p-6 bg-neutral-900 relative overflow-hidden h-60">
            <h2 class="text-white text-7xl font-bold" >
                Explication du projet
            </h2> 
        </div>
    </div>

    <!-- Information de la Team -->
    <div class="flex justify-center items-center gap-20 px-20">
        <!--Colonne de gauche-->
        <div class="w-1/4 shadow-lg shadow-fuchsia-600/100 rounded-lg p-6 bg-neutral-900 relative overflow-hidden h-60">
            <h2 class="text-white text-7xl font-bold" >Team</h2> 
        </div>
        <!-- Colonne de droite-->
        <div class="w-1/4 flex-1 shadow-lg shadow-cyan-500/100 rounded-lg p-6 bg-neutral-900">
            <ul class="text-white text-3xl">
                <li>• Butor Loic (Chef de projet )</li>
                <li>• Lecoustre Malcom</li>
                <li>• Minet Lorik</li>
                <li>• Pierru Mathéo</li>
                <li>• Hallot Hugo </li>
            </ul>
        </div>
    </div>  

</div>
</template>

<style>
.bg-hero {
    background-image: url('/background_index.jpg'); /* Chemin vers ton image */
    background-size: cover; /* Pour couvrir tout l'écran */
    background-position: center; /* Centrer l'image */
    background-repeat: no-repeat; /* Ne pas répéter l'image */
}
</style>