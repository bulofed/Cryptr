<template>
  <div class="w-min-screen flex flex-col px-16">
    <div class="flex items-center justify-between py-8 border-b-2 border-purple-500">
      <p class="text-3xl font-semibold">
        Rejoignez nous !
      </p>
      <div class="flex space-x-6 [&>*]:size-8">
        <IconGithub />
        <IconMail />
      </div>
    </div>
    <div class="flex justify-between py-4 text-xs">
      <p>@ 2024 Cryptr</p>
      <ol
        class="flex [&>:not(:last-child)]:border-e-2 [&>:not(:last-child)]:border-purple-500 hover:[&>*]:underline space-x-2 [&>:not(:last-child)]:pr-2"
      >
        <li>
          <NuxtLink to="/utilisateur/mention">
            Mentions légales
          </NuxtLink>
        </li>
      </ol>
    </div>
  </div>
</template>
