<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useEnigma } from '~/composable/useEnigma';
import Header from '~/components/Header.vue'; // Ajouter l'import du Header

const route = useRoute();
const enigma = ref(null);
const { fetchCurrentEnigma } = useEnigma();

enigma.value = await fetchCurrentEnigma();
if (enigma.value && enigma.value.imgPath) {
  enigma.value.imgPath = enigma.value.imgPath.replace(/^public\//, '');
}
</script>

<template>
  <div class="flex flex-col h-screen relative bg-hero-pattern bg-cover bg-center bg-no-repeat">
    <div class="relative">
      <Header/>
      <Inventory class="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"/>
    </div>
    
    <div class="grow flex items-center justify-center">
      <img 
        v-if="enigma && enigma.imgPath" 
        :src="`/${enigma.imgPath}`" 
        alt="Enigma Image" 
        style="width: 15%"
      />
    </div>
    <Terminal />
  </div>
</template>

<style scoped>
</style>