<template>
  <button
    @click="handleSwitchDarkMode"
    class="rounded-full p-2"
    :class="isIndexRoute ? 'bg-transparent text-white ' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white'"
  >
    <IconSun v-if="!darkMode" class="size-6" />
    <IconMoon v-else class="size-6" />
  </button>
</template>

<script setup>

const route = useRoute();

const isIndexRoute = computed(() => route.path === '/')

const darkMode = ref(true);

onMounted(() => {
  if (localStorage.theme === 'dark') {
    darkMode.value = true;
  } else {
    darkMode.value = false;
  }
  updateTheme();
});

function handleSwitchDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
  updateTheme();
}

function updateTheme() {
  darkMode.value
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}
</script>