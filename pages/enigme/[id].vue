<script setup>
import { ref } from 'vue';
import { useEnigma } from '~/composable/useEnigma';

const enigma = ref(null);
const { fetchCurrentEnigma } = useEnigma();


enigma.value = await fetchCurrentEnigma();
if (enigma.value && enigma.value.imgPath) {
  enigma.value.imgPath = enigma.value.imgPath.replace(/^public\//, '');
}
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
  </div>
</template>

<style scoped>
</style>