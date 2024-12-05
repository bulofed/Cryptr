<script setup>
import { handleConnexion } from "~/composable/handleConnexion";
import { handleSubmit } from "../server/handlers/registerHandler";
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    username: '',
    email: '',
    password: ''
});

const terms = ref(false);

const onSubmit = async () => {
    if (!terms.value) {
        alert('Vous devez accepter les termes et services pour continuer');
        return;
    }
    await handleSubmit(formData.value.username, formData.value.email, formData.value.password);
    await handleConnexion(router, formData.value.email, formData.value.password);
};
</script>

<template>
    <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
            <label for="username" class="block text-sm font-medium text-gray-700 py-1">
                <p class="font-bold">Nom d'utilisateur<span class="text-red-500 text-bold">*</span></p>
            </label>
            <input
                type="text"
                id="username"
                v-model="formData.username"
                required
                placeholder="Entrez nom d'utilisateur"
                class="block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm"
            />
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 py-1">
                <p class="font-bold">Email<span class="text-red-500 text-bold">*</span></p>
            </label>
            <input
                type="text"
                id="email"
                v-model="formData.email"
                required
                placeholder="Entrez votre mail"
                class="block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm"
            />
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 py-1">
                <p class="font-bold">Mot de passe<span class="text-red-500 text-bold">*</span></p>
            </label>
            <input
                type="password"
                id="motDePasse"
                v-model="formData.password"
                required
                placeholder="Entrez votre mot de passe"
                class="w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm"
            />
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input type="checkbox" id="terms" v-model="terms" class="h-4 w-4 text-indigo-600" />
                <label for="terms" class="block text-sm text-gray-900 px-1">
                    <b>J'accepte les termes et services</b>
                </label>
            </div>
        </div>
        <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 rounded-full text-sm text-white bg-neutral-900 hover:bg-red-700">S'inscrire
        </button>
        <p>Déjà un compte ? <a href="connexion" class="text-red-500 text-bold">Se connecter</a></p>
    </form>
</template>