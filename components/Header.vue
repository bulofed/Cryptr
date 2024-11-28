<template>
    <div class="flex items-center justify-between px-16 py-4 z-20 bg-transparent fixed top-0 left-0 w-full text-white">
        <IconLogo class="size-12 fill-white" />
        <nav class="flex space-x-8 text-base font-sans">
            <NuxtLink to="/dashboard"><b>Dashboard</b></NuxtLink>
            <NuxtLink to="/challenges"><b>Challenges</b></NuxtLink>
            <NuxtLink to="/classement"><b>Classement</b></NuxtLink>
              <NuxtLink to="/connexion"><b>Connexion</b></NuxtLink>
        </nav>
    </div>
</template>
