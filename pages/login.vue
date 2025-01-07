<template>
  <Form>
    <h1 class="font-bold text-3xl text-center mb-5">Connexion</h1>
    <form @submit.prevent="onSubmit">
      <InputField
        id="usernameOrEmail"
        label="Email ou nom d'utilisateur"
        type="text"
        placeholder="Entrez votre mail ou nom d'utilisateur"
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Entrez votre mot de passe"
      />
      <button type="submit" class="bg-black text-white w-full mb-5 py-2.5 rounded-md hover:bg-zinc-700 cursor-pointer">
        Connexion
      </button>
      <div class="flex justify-between">
        <FormLink href="/mot-de-passe-oublie" text="Mot de passe oublié ?" />
        <FormLink href="/register" text="Créer un compte" />
      </div>
    </form>
  </Form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { handleLogin } from "../server/handlers/loginHandler";

const router = useRouter();

const rememberMe = ref(false);

const emailOrUsername = ref('');
const password = ref('');

const onSubmit = async () => {

  const response = await handleLogin(emailOrUsername.value, password.value);

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