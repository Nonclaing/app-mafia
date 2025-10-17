<script setup lang="ts">
defineProps<{
  player: GamePlayer;
}>();
const { t } = useI18n();
</script>

<template>
  <h1 class="text-2xl font-bold text-center mb-4 break-words">
    {{ t('components.Day.LastSpeech.title') }}
  </h1>
  <div class="flex flex-col my-auto">
    <h2 class="text-xl font-bold text-center mb-4 break-words">
      {{ t('components.Day.LastSpeech.dead', { name: player.fullName }) }}
    </h2>
  </div>
  <UiStopwatch />
</template>
