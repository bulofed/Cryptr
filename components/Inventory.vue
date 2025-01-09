<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  count: {
    type: Number,
    default: 5
  }
});

const selectedItem = ref(null);

const selectItem = (i) => {
  selectedItem.value = i;
};

const deselectItem = () => {
  selectedItem.value = null;
};

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    deselectItem();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <div class="flex justify-center">
    <div class="flex gap-4">
      <div 
        v-for="i in count" 
        :key="i" 
        class="size-32 bg-neutral-700 rounded-lg cursor-pointer"
        @click="selectItem(i)"
        :class="{ 'expanded': selectedItem === i }"
      ></div>
    </div>
    <div v-if="selectedItem" class="overlay" @click="deselectItem">
      <div class="arrow" @click.stop="deselectItem">←</div>
    </div>
  </div>
</template>

<style scoped>
.size-32 {
  width: 32px;
  height: 32px;
}
.expanded {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px; 
  height: 300px; 
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white; 
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.arrow {
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
</style>