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
      <label for="motDePasse">Mot de passe:</label>
      <input
        id="motDePasse"
        type="password"
        required
      >
    </div>

    <button type="submit">
      Se connecter
    </button>

    <p>Pas de compte? <a href="/inscription"> S'inscrire </a></p>
  </form>
</template>

<style></style>
