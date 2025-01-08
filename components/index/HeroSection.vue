<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userCount = ref(0);
const enigmeCountfinish = ref(0);
const enigmeCount = ref(0);
const isLoading = ref(true);
const router = useRouter();


const fetchUserCount = async () => {
  try {
    const { data, error } = await useFetch('/api/utilisateurs/count');
    if (error.value) {
      console.error('Erreur lors de la récupération du nombre d\'utilisateurs :', error.value);
    } else {
      console.log('Données récupérées pour userCount:', data.value.data);
      userCount.value = data.value.data;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre d\'utilisateurs :', err);
  }
};

const fetchEnigmeCountfinish = async () => {
  try {
    const { data, error } = await useFetch('/api/enigmes/finishedCount');
    if (error.value) {
      console.error('Erreur lors de la récupération du nombre d\'énigmes :', error.value);
    } else {
      enigmeCountfinish.value = data.value.data;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre d\'énigmes :', err);
  }
};

const fetchEnigmeCount = async () => {
  try {
    const { data, error } = await useFetch('/api/enigmes/count');
    if (error.value) {
      console.error('Erreur lors de la récupération du nombre d\'énigmes :', error.value);
    } else {
      enigmeCount.value = data.value.data;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre d\'énigmes :', err);
  }
};

const handleStartChallenge = () => {
  router.push('/challenge');
};

onMounted(async () => {
  await fetchUserCount();
  await fetchEnigmeCountfinish();
  await fetchEnigmeCount();
  isLoading.value = false;
});
</script>

<style scoped>
.radial-1 {
  background: radial-gradient(circle, #10b981 0%, #ffffff00 75%);
}
.radial-2 {
  background: radial-gradient(circle, #f43f5e 0%, #ffffff00 75%);
}
.radial-3 {
  background: radial-gradient(circle, #f59e0b 0%, #ffffff00 75%);
}


</style>

<template>
  <div class="max-w-5xl mx-auto pt-20 relative">
    <div class="hexagone"></div>
        <div class="hexagone" style="top: 60%; left: 60%;"></div>

    <div class="absolute left-[2  0rem] -bottom-32 size-[50rem] radial-1 opacity-0 dark:opacity-20"/>
    <div class="absolute right-[20rem] top-12 size-[65rem] radial-2 opacity-0 dark:opacity-20"/>
    <div class="absolute left-48 bottom-32 size-[35rem] radial-3 opacity-0 dark:opacity-20"/>
    <div class="relative">
      <h1 class="text-left font-extrabold tracking-tight text-6xl text-zinc-900 dark:text-white my-12">
         Déchiffrez <span class="text-red inline-block text-red-600">l'impossible</span> 🕵️‍♂️
        <span class="block "> <span class="text-blue inline-block text-blue-600">Rejoignez</span> l'élite 🚀</span>
      </h1>


      <div class="flex justify-center gap-20 font-code text-center pt-20">
        <div>
          <p class="text-9xl font-bold text-green-400 transition-all duration-300 transform hover:scale-110">{{ userCount }}</p>
          <p class="text-4xl"> <strong>Utilisateur actifs</strong> </p>
        </div>
        <div> 
          <p class="text-9xl font-bold text-orange-600 transition-all duration-300 hover:scale-110 ">{{ enigmeCountfinish }}</p>
          <p class="text-4xl"><strong>Cryptanalyses complétées </strong></p>
        </div>
        <div>
          <p class="text-9xl font-bold text-red-600 hover:text-10xl transition-all duration-300 hover:scale-110"> {{ enigmeCount }}</p>
          <p class="text-4xl"> <strong>Défis disponibles</strong></p>
        </div>
      </div>

      <div class="flex justify-center pt-20">
        <a
          @click="handleStartChallenge"
          class="py-4 px-6 rounded-lg bg-blue-600 hover:bg-blue-900 dark:bg-sky-500 dark:hover:bg-sky-400 flex transition text-white font-semibold cursor-pointer transition-all duration-300 hover:scale-110 ">
          Commencer le challenge
        </a>
      </div>
    </div>
  </div>
</template>