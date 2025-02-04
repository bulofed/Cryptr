<script setup>
import { ref, onMounted, watch } from 'vue';
import { useEnigma, useUnlockedEnigmas } from '~/composable/useEnigma';
import { useSession } from '~/composable/useSession';
import { useRouter } from 'vue-router';

const enigma = ref(null);
const { fetchCurrentEnigma } = useEnigma();
const { enigmes, fetchUnlockedEnigmas } = useUnlockedEnigmas();
const { user, loadSession } = useSession();

const router = useRouter();

const isLeftPanelOpen = ref(false);
const isRightPanelOpen = ref(false);

const toggleLeftPanel = () => {
  isLeftPanelOpen.value = !isLeftPanelOpen.value;
};

const toggleRightPanel = () => {
  isRightPanelOpen.value = !isRightPanelOpen.value;
};

const closePanelsOnEscape = (event) => {
  if (event.key === 'Escape') {
    isLeftPanelOpen.value = false;
    isRightPanelOpen.value = false;
  }
};

const updateEnigmas = async () => {
  await fetchUnlockedEnigmas(user);
};

onMounted(async () => {
  loadSession();
  enigma.value = await fetchCurrentEnigma();
  if (enigma.value && enigma.value.imgPath) {
    enigma.value.imgPath = enigma.value.imgPath.replace(/^public\//, '');
  }
  if (user.value) {
    await updateEnigmas();
  }

  window.addEventListener('keydown', closePanelsOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', closePanelsOnEscape);
});

watch(enigmes, async () => {
  await updateEnigmas();
});

const commands = [
  { name: '/help', description: 'donne la liste des commandes disponibles'},
  { name: '/desc', description: 'donne la description de l énigme actuelle'},
  { name: '/clear',description: 'efface le terminal'},
  { name: '/try' , description: 'essaye une solution pour l énigme actuelle'},
  { name: '/go_to',description: 'va à l énigme avec le nom ou l index spécifié'},
  { name: '/inspect',description:'inspecte en detaille l enigme, utile pour copier les textes chiffrés'},
  { name: '/clue',description: 'Try a solution for the current enigma'},
  { name: 'CTRL + C', description: 'affiche instantanément tout le texte d un message  dans le terminal au lieu de caractères par caractères'}
];



const goToEnigma = (id) => {
  router.push(`/enigme/${id}`);
};

const sortedEnigmes = computed(() => {
  return [...enigmes.value].sort((a, b) => a.difficultyLevel - b.difficultyLevel)
});

</script>

<template>
  <NuxtLink to="/challenges" class="absolute top-8 left-8 cursor-pointer z-10">
    <IconChevronLeft class="size-12 stroke-white"/>
  </NuxtLink>
  <div class="flex flex-col py-4 h-screen relative bg-hero-pattern bg-cover bg-center bg-no-repeat">
    <Inventory />
    
    <div class="grow flex items-center justify-center">
      <img 
        v-if="enigma && enigma.imgPath" 
        :src="`/${enigma.imgPath}`" 
        alt="Enigma Image" 
        style="width: 20%"
      />
    </div>  

    <Terminal />
    <!-- Bouton gauche -->
    <button
      @click="toggleLeftPanel"
      class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white h-12 w-12 flex items-center justify-center rounded-r-lg shadow-lg z-10"
    >
      <IconChevronRight class="size-6" />
    </button>

    <!-- Bouton droit -->
    <button
      @click="toggleRightPanel"
      class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white h-12 w-12 flex items-center justify-center rounded-l-lg shadow-lg z-10"
    >
      <IconChevronLeft class="size-6" />
    </button>

    <!-- Panneau gauche -->
    <transition name="slide-left">
      <div v-if="isLeftPanelOpen" class="absolute top-0 left-0 h-full w-64 bg-gray-900 shadow-md z-20 flex flex-col p-4 scroll-auto">
        <button
          @click="toggleLeftPanel"
          class="self-end text-gray-400 hover:text-gray-200"
        >
          ✖
        </button>
        <p class="text-white p-2 text-lg font-extrabold">Liste des commandes du Terminal</p>
        <br>
        <ul class="text-white">
          <li v-for="command in commands" :key="command.name">
            <button class="font-bold">{{ command.name }}</button>: {{ command.description }}
            <hr class="my-2 border-gray-700"/> <!-- Ligne horizontale entre les commandes -->
          </li>
        </ul>


      
      </div>
    </transition>

    <!-- Panneau droit -->
    <transition name="slide-right">
    <div v-if="isRightPanelOpen" class="absolute top-0 right-0 h-full w-64 bg-gray-900 shadow-md z-20 flex flex-col p-4">
      <button
        @click="toggleRightPanel"
        class="self-end text-gray-700 hover:text-gray-900"
      >
        ✖
      </button>
      <div class="text-white">
        <p>Liste des énigmes :</p>
        <ul class="text-lg py-5  ">
          <li v-for= "(enigme, index ) in sortedEnigmes" in  :key="enigme._id" @click="goToEnigma(enigme._id)">
            {{ index + 1 }}- <button>{{ enigme.title }}</button>  
          </li>
        </ul>
        <p class="text-white p-2 text-lg font-extrabold py-3">Site utile : </p>
        <a href="https://www.dcode.fr/" class="text-white" target="_blank">dcode.fr </a><br>
        <a href="https://stylesuxx.github.io/steganography/" class="text-white" target="_blank">steganography</a>
      </div>
    </div>
  </transition>

  </div>
</template>

<style scoped>
</style>