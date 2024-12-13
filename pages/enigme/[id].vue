<script setup>
import { ref } from 'vue';
import { useEnigma } from '~/composable/useEnigma';

const enigma = ref(null);
const { fetchCurrentEnigma } = useEnigma();


enigma.value = await fetchCurrentEnigma();
if (enigma.value && enigma.value.imgPath) {
  enigma.value.imgPath = enigma.value.imgPath.replace(/^public\//, '');
}

const isLeftPanelOpen = ref(false);
const isRightPanelOpen = ref(false);

const toggleLeftPanel = () => {
  isLeftPanelOpen.value = !isLeftPanelOpen.value;
};

const toggleRightPanel = () => {
  isRightPanelOpen.value = !isRightPanelOpen.value;
};

</script>



<template>
  <NuxtLink to="/challenge" class="absolute top-8 left-8 cursor-pointer z-10">
    <IconChevronLeft class="size-12 stroke-white"/>
  </NuxtLink>
  <div class="flex flex-col py-4 h-screen relative bg-hero-pattern bg-cover bg-center bg-no-repeat">
    <Inventory />
    
    <div class="grow flex items-center justify-center">
      <img 
        v-if="enigma && enigma.imgPath" 
        :src="`/${enigma.imgPath}`" 
        alt="Enigma Image" 
        style="width: 15%"
      />
    </div>  

    <Terminal />
    <!-- Bouton gauche -->
    <button
      @click="toggleLeftPanel"
      class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white h-12 w-12 flex items-center justify-center rounded-r-lg shadow-lg z-10"
    >
      <IconChevronLeft class="size-6" />
    </button>

    <!-- Bouton droit -->
    <button
      @click="toggleRightPanel"
      class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white h-12 w-12 flex items-center justify-center rounded-l-lg shadow-lg z-10"
    >
      <IconChevronRight class="size-6" />
    </button>

    <!-- Panneau gauche -->
    <transition name="slide-left">
      <div
        v-if="isLeftPanelOpen"
        class="absolute top-0 left-0 h-full w-64 bg-white shadow-md z-20 flex flex-col p-4"
      >
        <button
          @click="toggleLeftPanel"
          class="self-end text-gray-700 hover:text-gray-900"
        >
          ✖
        </button>
        <p>Contenu du panneau gauche</p>
      </div>
    </transition>

    <!-- Panneau droit -->
    <transition name="slide-right">
      <div
        v-if="isRightPanelOpen"
        class="absolute top-0 right-0 h-full w-64 bg-white shadow-md z-20 flex flex-col p-4"
      >
        <button
          @click="toggleRightPanel"
          class="self-end text-gray-700 hover:text-gray-900"
        >
          ✖
        </button>
        <p>Contenu du panneau droit</p>
      </div>
    </transition>

  </div>
</template>

<style scoped>
</style>