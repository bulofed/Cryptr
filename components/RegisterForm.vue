<script setup></script>

<template>
  <form>
    <div>
      <label for="username">Nom d'utilisateur:</label>
      <input
        id="username"
        type="text"
        required
      >
    </div>

    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        required
      >
    </div>

    <div>
      <label for="motDePasse">Mot de passe:</label>
      <input
        id="motDePasse"
        type="password"
        required
      >
    </div>

    <button type="submit">
      S'inscrire
    </button>

    <p>Déjà un compte? <a href="/connexion"> Se connecter </a></p>
  </form>
</template>

<style></style>
