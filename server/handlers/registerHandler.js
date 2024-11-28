export const handleSubmit = async (username, email, motDePasse) => {
    try{
        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                username,
                email,
                motDePasse,
            },
        });
        
        console.log('User registered successfully:', response);
    } catch (err){
      console.error(err);
    }
};