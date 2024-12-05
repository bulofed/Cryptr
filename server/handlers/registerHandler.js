import mongoose from 'mongoose';

export const handleSubmit = async (username, email, motDePasse) => {
    try {
        const enigmaId = new mongoose.Types.ObjectId('674d8105775bbb403acafd06');

        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                username,
                email,
                motDePasse,
                enigmaId
            },
        });
        
        console.log('User registered successfully:', response);
    } catch (err) {
        console.error('Error during user registration:', err);
    }
};