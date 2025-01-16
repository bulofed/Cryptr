<script setup>
import { useSession } from '~/composable/useSession';

const { user, loadSession } = useSession();

const unlockedClues = ref([]);

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

const fetchUser = async (username) => {
  try {
    if (!username) {
      return null;
    }
    const response = await $fetch(`/api/utilisateurs/${username}`);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

const fetchClues = async (user) => {
  try {
    const userData = await fetchUser(user.value.username);
    if (userData && userData.unlockedClues) {
      unlockedClues.value = userData.unlockedClues;
    }
  } catch (error) {
    console.error('Failed to fetch clues:', error);
  }
};

onMounted(async () => {
  loadSession();
  await fetchClues(user);
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
        v-for="(clue, index) in unlockedClues" 
        :key="index" 
        class="w-32 bg-neutral-700 rounded-lg cursor-pointer"
        @click="selectItem(index)"
        :class="{ 'expanded': selectedItem === index }"
      >
        <img :src="clue.imgpath" alt="Clue Image" class="object-cover rounded-lg" />
      </div>
    </div>
    <div v-if="selectedItem !== null" class="overlay" @click="deselectItem">
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
  width: 500px; 
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