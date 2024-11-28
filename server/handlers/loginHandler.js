const isEmail = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  };
  
  export const handleLogin = async (emailOrUsername, motDePasse) => {
    const trimmedInput = emailOrUsername.trim();
    console.log(`Input received: ${trimmedInput}`);
    const isEmailAddress = isEmail(emailOrUsername);
  
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          identifier: trimmedInput,
          motDePasse,
          isEmail: isEmailAddress,
        },
      });
  
      if (response.status === 200) {
        console.log('Connexion réussie : ', response.message);
        return response;
      } else {
        console.log('Connexion échouée:', response.message);
        return response;
      }
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      return {
        status: 500,
        success: false,
        message: 'Une erreur est survenue lors de la connexion.',
      };
    }
  };