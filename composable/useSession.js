// composable/useSession.js
import { ref } from 'vue';
import Cookies from 'js-cookie';

export const useSession = () => {
  const user = ref(null);

  const loadSession = () => {
    const session = Cookies.get('session');
    if (session) {
      user.value = JSON.parse(session);
    }
  };

  const clearSession = () => {
    Cookies.remove('session');
    user.value = null;
  };

  return {
    user,
    loadSession,
    clearSession
  };
};