<template>
    <div class="h-screen w-min-screen bg-hero relative">
        <!-- Texte et contenu -->
        <h1 class="flex text-white z-10 text-center font-bold px-40  py-40 text-5xl">
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


<!--Carrousel à mettre ici-->
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
                <li>Butor Loic (Chef de projet )</li>
                <li>Lecoustre Malcom</li>
                <li>Minet Lorik</li>
                <li>Pierru Mathéo</li>
                <li>Hallot Hugo </li>
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
