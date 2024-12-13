import mongoose from 'mongoose';

export const handleSubmit = async (username, email, password) => {
    try {
        const enigmaId = new mongoose.Types.ObjectId('675c49d32a928827bb40be80');

        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                username,
                email,
                password,
                enigmaId
            },
        });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(response.message || 'Registration failed');
        }
    } catch (err) {
        console.error('Error during user registration:', err);
        throw err;
    }
};