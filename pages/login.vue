<template>
  <Form>
    <h1 class="font-bold text-3xl text-center mb-5">Connexion</h1>
    <form>
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700 mb-1">
          Email ou nom d'utilisateur
        </label>
        <input type="text" required placeholder="Entrez votre mail ou nom d'utilisateur"
          class="text-black w-full p-3 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700 mb-1">
          Mot de passe
        </label>
        <input type="password" required placeholder="Entrez votre mot de passe"
         class="text-black w-full p-3 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button type="submit" class="bg-black text-white w-full mb-5 py-2.5 rounded-md hover:bg-zinc-700 cursor-pointer">
        Connexion
      </button>
      <div class="flex justify-between">
        <a href="#" class="text-blue-600 hover:underline">Mot de passe oublié ?</a>
        <a href="#" class="text-blue-600 hover:underline">Créer un compte</a>
      </div>
    </form>
  </Form>
</template>

<script lang="ts" setup>

</script>

<style>

</style>