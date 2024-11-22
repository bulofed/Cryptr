<script setup>

</script>

<template>
    <form>
        <div>
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username"  required />
        </div>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" required />
        </div>
        
        <div>
            <label for="motDePasse">Mot de passe:</label>
            <input type="password" id="motDePasse" required />
        </div>
        
        <button type="submit">S'inscrire</button>

        <p>Déjà un compte? <a href="/connexion"> Se connecter </a></p>
    </form>
</template>

<style>

</style>