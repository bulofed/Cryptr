<template>
  <Form>
    <h1 class="font-bold text-3xl text-center mb-5">Inscription</h1>
    <form @submit.prevent="onSubmit">
      <InputField
        id="username"
        label="Nom d'utilisateur"
        type="text"
        placeholder="Entrez votre nom d'utliisateur"
        v-model="formData.username"
      />
      <InputField
        id="email"
        label="Email"
        type="text"
        placeholder="Entrez votre email"
        v-model="formData.email"
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Entrez votre mot de passe"
        v-model="formData.password"
      />
      <vue-recaptcha :sitekey="siteKey" @verify="onCaptchaVerified"></vue-recaptcha>
      <button type="submit" class="bg-black text-white w-full mb-5 py-2.5 rounded-md hover:bg-zinc-700 cursor-pointer">
        S'inscrire
      </button>
      <div class="flex justify-end">
        <FormLink href="/login" text="Se connecter" />
      </div>
    </form>
  </Form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { handleSubmit } from "../server/handlers/registerHandler";
import { VueRecaptcha } from 'vue-recaptcha';

const formData = ref({
  username: '',
  email: '',
  password: ''
});

const router = useRouter();

const siteKey = useRuntimeConfig().public.recaptchaSiteKey;
const onCaptchaVerified = (response) => {
    formData.value.recaptchaResponse = response;
    console.log('ReCaptcha vérifié:', response);
};

const onSubmit = async () => {
  if (!formData.value.recaptchaResponse){
    alert('Veuillez valider le captcha!');
    return;
  }
  try {
    const user = await handleSubmit(formData.value.username, formData.value.email, formData.value.password);
    Cookies.set('session', JSON.stringify(user), { expires: 7 });
    router.push('/');
  } catch (err) {
    alert('Registration failed: ' + err.message);
  }
};
</script>