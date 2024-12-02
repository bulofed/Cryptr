import { useRoute } from 'vue-router';

export const useEnigma = () => {
  const route = useRoute();

  const fetchCurrentEnigma = async () => {
    try {
      const id = route.params.id;
      if (!id) {
        return null;
      }
      const response = await $fetch(`/api/enigmes/${id}`);
      console.log(response);
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