<template>
  <DashboardElement custom-class="justify-evenly items-center" v-for="(value, key) in translatedStatistics" :key="key">
    <component :is="getIcon(key)" class="size-12" />
    <div class="flex flex-col justify-center text-right">
      <p class="text-lg text-zinc-500">{{ key }}</p>
      <p class="text-3xl font-bold">{{ value }}</p>
    </div>
  </DashboardElement>
</template>

<script setup>
import { useSession } from '~/composable/useSession'
import { fetchUser } from '~/composable/useUser'
import Trophy from '~/components/icon/Trophy.vue'
import Timer from '~/components/icon/Timer.vue'
import Lightbulb from '~/components/icon/Lightbulb.vue'

const { user, loadSession } = useSession()
const translatedStatistics = ref({})

const translationMap = {
  resolvedClue: 'Indices utilisés',
  averageTimeResolution: 'Temps moyen par énigme'
}

const reverseTranslationMap = Object.fromEntries(
  Object.entries(translationMap).map(([key, value]) => [value, key])
)

const iconMap = {
  resolvedClue: Lightbulb,
  averageTimeResolution: Timer
}

const getIcon = (translatedKey) => {
  const originalKey = reverseTranslationMap[translatedKey]
  return iconMap[originalKey] || null
}

onMounted(async () => {
  loadSession()
  const userInfo = await fetchUser(user.value.username)
  translatedStatistics.value = Object.fromEntries(
    Object.entries(userInfo.team.statistics).map(([key, value]) => [translationMap[key] || key, value])
  )
})
</script>