<script setup>

</script>

<template>
    <form>
        <div>
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username" required />
        </div>
        
        <div>
            <label for="motDePasse">Mot de passe:</label>
            <input type="password" id="motDePasse" required />
        </div>
        
        <button type="submit">Se connecter</button>

        <p>Pas de compte? <a href="/inscription"> S'inscrire </a></p>
    </form>
</template>

<style>



</style>