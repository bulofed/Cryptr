const isEmail = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  };
  
  export const handleLogin = async (emailOrUsername, password, recaptchaResponse) => {
    const trimmedInput = emailOrUsername.trim();
    const isEmailAddress = isEmail(emailOrUsername);
  
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          identifier: trimmedInput,
          password,
          isEmail: isEmailAddress,
          recaptchaResponse,
        },
      });
  
      if (response.status === 200) {
        return response;
      } else {
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