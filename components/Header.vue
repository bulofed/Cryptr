<script setup>
defineProps({
  isChallengePage: {
    type: Boolean,
    default: false
  },
  isClassementPage: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex items-center justify-between px-16 py-3 z-20 top-0 left-0 w-full transition-colors duration-300"
       :class="[(isChallengePage || isClassementPage) ? 'bg-gray-100 text-black' : 'bg-[#02001B] text-white']">
    <NuxtLink to="/">
      <IconLogo 
        class="size-12" 
        :class="[(isChallengePage || isClassementPage) ? 'fill-black' : 'fill-white']"
      />
    </NuxtLink>
    <nav class="flex space-x-8 text-base font-sans">
      <NuxtLink to="/dashboard"><b>Dashboard</b></NuxtLink>
      <NuxtLink to="/challenge"><b>Challenge</b></NuxtLink>
      <NuxtLink to="/classement"><b>Classement</b></NuxtLink>
    </nav>
  </div>
</template>