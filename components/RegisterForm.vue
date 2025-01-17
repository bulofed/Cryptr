<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { handleSubmit } from "../server/handlers/registerHandler";

const formData = ref({
    username: '',
    email: '',
    password: '',
    recaptchaResponse: null
});

const router = useRouter();

const siteKey = process.env.RECAPTCHA_PUBLIC || '6Ld5gK8qAAAAAOfCBTEU0__kqDOt3atAWj1slIdY';
const onCaptchaVerified = (response) => {
    formData.value.recaptchaResponse = response;
    console.log('ReCaptcha vérifié:', response);
};

const onSubmit = async () => {
    try {
      if (!formData.value.recaptchaResponse){
        alert('Veuillez valider le captcha!');
        return;
      }

      const user = await handleSubmit(formData.value.username, formData.value.email, formData.value.password, formData.value.recaptchaResponse);
      Cookies.set('session', JSON.stringify(user), { expires: 7 });
      router.push('/');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
};
</script>

<template>
  <NuxtLink to="/">
    <IconLogo class="absolute top-8 left-8 size-12 fill-black cursor-pointer" />
  </NuxtLink>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="flex gap-8 items-center bg-white p-8 rounded-lg shadow-lg max-w-4xl">
      <!-- Formulaire -->
      <div class="space-y-5">
        <!-- Titre -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Creez votre compte</h2>
        </div>

        <!-- Formulaire de connexion -->
        <form class="space-y-4" @submit.prevent="onSubmit">
          <!-- Champ Email ou Nom d'utilisateur -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 py-1" >
              <p class="font-bold">
                Nom d'utilisateur
                <a href="" class="text-red-500 text-bold">*</a>
              </p>
            </label>
            <input type="text" id="username"  v-model="formData.username" required placeholder="Entrez nom d'utilisateur"
              class="text-black block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm text-xs"
            />
          </div>

          <div>
            <label for="Email" class="block text-sm font-medium text-gray-700 py-1">
              <p class="font-bold">
                Email 
                <a href="" class="text-red-500 text-bold">*</a>
              </p>
            </label>
            <input type="text" id="email"  v-model="formData.email" required placeholder="Entrez votre mail"
              class="text-black block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm text-xs"
            />
          </div>

          <!-- Champ Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 py-1">
              <p class="font-bold">
                Mot de passe
                <a href="" class="text-red-500 text-bold">*</a>
              </p>
            </label>
            <input type="password" id="motDePasse"  v-model="formData.password" required placeholder="Entrez votre mot de passe"
             class="text-black w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm text-xs"
            />
          </div>

          <vue-recaptcha :sitekey="siteKey" @verify="onCaptchaVerified"></vue-recaptcha>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 rounded-full text-sm text-white bg-neutral-900 hover:bg-red-700" > S'inscrire
          </button>

          <!-- Lien vers l'inscription -->
          <p>   
            Déjà un compte ?
            <a href="connexion" class="text-red-500 text-bold">Se connecter</a>
          </p>
        </form>
      </div>
      <!-- Fin du formulaire -->

      <!-- Image -->
      <img src="~/public/Logo_Lock.jpg" alt="Authentification" class="w-32 rounded-lg" />
    </div>
  </div>
</template>
