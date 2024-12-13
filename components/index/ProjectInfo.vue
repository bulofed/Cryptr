<template>
  <h1 class="text-8xl font-title text-center font-extrabold pt-10">Comment ça marche ?</h1>

  <div class="flex flex-col gap-16 px-20 pt-16 pb-20 dark:text-white text-2xl">
    <div class="neon !border-gray-200 dark:shadow-blue-500 rounded-lg px-6 py-12">
      <p>
        Le but du projet est de créer une plateforme web dédiée à la résolution 
        d'énigmes centrées sur la cryptographie.<br>
        Cette plateforme permettra aux utilisateurs de s’authentifier,
        de suivre leurs progrès, et de comptabiliser leurs tentatives avant réussite.<br>
        Chaque énigme résolue rapportera des points, ajustés selon l’utilisation d’indices, et les utilisateurs pourront se regrouper en équipes pour participer à des compétitions avec un classement général.
      </p>
    </div>
    <div class="neon !border-gray-200 dark:shadow-rose-500 rounded-lg px-6 py-12 flex justify-center">
      <ul class="flex gap-6">
        <li>Butor Loic (Chef de projet )</li>
        <li>Lecoustre Malcom</li>
        <li>Minet Lorik</li>
        <li>Pierru Mathéo</li>
        <li>Hallot Hugo </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.neon {
  border: 0.2rem solid #fff;
  box-shadow: 0 0 .2rem #fff,
              0 0 .2rem #fff,
              0 0 2rem var(--tw-shadow-color),
              0 0 0.8rem var(--tw-shadow-color),
              0 0 2.8rem var(--tw-shadow-color),
              inset 0 0 1.3rem var(--tw-shadow-color);
}
</style>