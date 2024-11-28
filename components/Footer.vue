<template>
  <div class="bg-neutral-800 w-min-screen flex flex-col px-16">
    <div
      class="flex items-center justify-between py-8 border-b-2 border-purple-500"
    >
      <p class="text-3xl font-semibold  text-white">
        Rejoignez nous !
      </p>
      <div class="flex space-x-6 [&>*]:size-8">
        <IconGithub class="fill-white"/>
        <IconMail class="fill-white" />
      </div>
    </div>
    <div class="flex justify-between py-4 text-xs  text-white">
      <p>@ 2024 Cryptr</p>
      <ol
        class="flex [&>:not(:last-child)]:border-e-2 [&>:not(:last-child)]:border-purple-500 hover:[&>*]:underline space-x-2 [&>:not(:last-child)]:pr-2"
      >
        <li>
          <NuxtLink to="/">
            Conditions d'utilisation
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            Politique de confidentialité
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            Gestion des cookies
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            Mentions légales
          </NuxtLink>
        </li>
      </ol>
    </div>
  </div>
</template>
