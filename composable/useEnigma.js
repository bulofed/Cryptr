import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchUser } from '~/composable/useUser';

export const useEnigma = () => {
  const route = useRoute();

  const fetchCurrentEnigma = async () => {
    try {
      const id = route.params.id;
      if (!id) {
        return null;
      }
      const response = await $fetch(`/api/enigmes/${id}`);
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch enigma:', error);
      return null;
    }
  };

  return {
    fetchCurrentEnigma
  };
};

export const useUnlockedEnigmas = () => {
  const enigmes = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchUnlockedEnigmas = async (user) => {
    try {
      loading.value = true;
      const response = await $fetch('/api/enigmes');
      
      if (response.success) {
        const allEnigmas = response.data;
      
        const userData = await fetchUser(user.value.username);
        
        if (userData && userData.unlockedEnigmas) {
          const unlockedTitles = userData.unlockedEnigmas.map(unlocked => unlocked.title);
          enigmes.value = allEnigmas.filter(enigma => unlockedTitles.includes(enigma.title));
        } else {
          enigmes.value = [];
        }
      } else {
        error.value = 'Erreur de chargement';
      }
    } catch (error) {
      console.error('Erreur:', error);
      error.value = 'Erreur lors de la récupération des énigmes';
    } finally {
      loading.value = false;
    }
  };

  return {
    enigmes,
    loading,
    error,
    fetchUnlockedEnigmas
  };
};