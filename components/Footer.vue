<template>
  <div class="bg-neutral-800 w-screen flex flex-col px-16">
    <div class="flex items-center justify-between py-8 border-b-2 border-red-500">
      <p class="text-3xl font-semibold text-slate-50">Rejoignez nous !</p>
      <div class="flex space-x-6">
        <img src="~/public/github.svg" alt="Logo_github" class="size-8"/> 
        <img src="~/public/mail.svg" alt="Logo_mail" class="size-8"> 
      </div>
    </div>
    <div class="flex justify-between py-4 text-xs text-slate-50">
      <p>@ 2024 Cryptr</p>
      <ol class="flex">
        <li class="border-e-2 border-red-500 pr-2 hover:underline">
          Conditions d'utilisation
        </li>
        <li class="border-e-2 border-red-500 px-2 hover:underline">
          Politique de confidentialité
        </li>
        <li class="border-e-2 border-red-500 px-2 hover:underline">
          Gestion des cookies
        </li>
        <li class="pl-2 hover:underline">
          Mentions légales
        </li>
      </ol>
    </div>
  </div>
</template>