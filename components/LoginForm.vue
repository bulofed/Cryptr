<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { handleLogin } from "../server/handlers/loginHandler";
import { VueRecaptcha } from 'vue-recaptcha';

const router = useRouter();

const rememberMe = ref(false);

const emailOrUsername = ref('');
const password = ref('');

const cle = process.env.RECAPTCHA_PUBLIC || '6Ld5gK8qAAAAAOfCBTEU0__kqDOt3atAWj1slIdY';
const recaptchaResponse = ref(null);

const onCaptchaVerified = (response) => {
  recaptchaResponse.value = response;
  console.log('ReCaptcha vérifié:', response);
};

const onSubmit = async () => {
  if (!recaptchaResponse.value) {
    alert('Veuillez valider le captcha!');
    return;
  }

  const response = await handleLogin(emailOrUsername.value, password.value, recaptchaResponse.value);

  if (response.status === 200) {
    Cookies.set('session', JSON.stringify(response.user), { expires: rememberMe.value ? 7 : null });

    // Rediriger l'utilisateur vers la page d'accueil ou une autre page
    router.push('/');
  } else {
    // Afficher un message d'erreur
    alert(response.message);
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
      <div class="space-y-8">
        <!-- Titre -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Connexion</h2>
        </div>

        <!-- Formulaire de connexion -->
        <form class="space-y-7" @submit.prevent="onSubmit">
          <!-- Champ Email ou Nom d'utilisateur -->
          <div>
            <label for="mail_or_username" class="block text-sm font-medium text-gray-700 py-1">
              <p class="font-bold">
                Email ou nom d'utilisateur
                <a href="" class="text-red-500 text-bold">*</a>
              </p>
            </label>
            <input type="text" id="mail_or_username" v-model = "emailOrUsername" required placeholder="Entrez votre mail ou nom d'utilisateur"
              class="text-black block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm text-xs"
            />
          </div>

          <!-- Champ Mot de passe -->
          <div>
            <label for="motDePasse" class="block text-sm font-medium text-gray-700 py-1">
              <p class="font-bold">
                Mot de passe
                <a href="" class="text-red-500 text-bold">*</a>
              </p>
            </label>
            <input type="password" id="motDePasse" v-model="password" required placeholder="Entrez votre mot de passe"
             class="text-black w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm text-xs"
            />
          </div>

          <!-- Options supplémentaires -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" id="remember" v-model="rememberMe" class="h-4 w-4 text-indigo-600" />
              <label for="remember" class="block text-sm text-gray-900 px-1">
                <b>Rester connecté</b>
              </label>
            </div>
            <a href="/mot-de-passe-oublie" class="text-sm text-black hover:text-red-500 px-5">
              <b>Mot de passe oublié ?</b>
            </a>
          </div>

          <vue-recaptcha :sitekey="cle" @verify="onCaptchaVerified"></vue-recaptcha>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 rounded-full text-sm text-white bg-neutral-900 hover:bg-red-700" > Se connecter
          </button>

          <!-- Lien vers l'inscription -->
          <p>
            Pas encore inscrit ?
            <a href="inscription" class="text-red-500 text-bold">S'inscrire</a>
          </p>
        </form>
      </div>
      <!-- Fin du formulaire -->

      <!-- Image -->
      <img src="~/public/Logo_Lock.jpg" alt="Authentification" class="w-full rounded-lg" />
    </div>
  </div>
</template>