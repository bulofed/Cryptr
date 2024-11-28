<template>
    <div class="h-screen w-screen bg-hero relative">
        <!-- Texte et contenu -->
        <h1 class="flex text-white z-10 text-center text-3xl font-bold px-40  py-40 text-5xl">
            Déchiffrez l'impossible,<br>Rejoignez l'élite 🚀
        </h1>

        <div class="absolute bottom-32 w-full flex justify-center z-10">
            <router-link
                to="/connexion"
                class="py-2 px-6 w-80 h-16 rounded-full text-sm text-white bg-cyan-600 hover:bg-red-700 text-xl text-center flex items-center justify-center">
                Commencer le challenge
            </router-link>
        </div>
    </div>
</template>
<style>
.bg-hero {
    background-image: url('/test3.jpg'); /* Chemin vers ton image */
    background-size: cover; /* Pour couvrir tout l'écran */
    background-position: center; /* Centrer l'image */
    background-repeat: no-repeat; /* Ne pas répéter l'image */
}
</style>
