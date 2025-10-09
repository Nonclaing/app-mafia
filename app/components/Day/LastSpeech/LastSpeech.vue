<script setup lang="ts">
defineProps<{
  player: GamePlayer;
}>();
</script>

<template>
  <h1 class="text-2xl font-bold text-center mb-4 break-words">
    Финальная речь игрока
  </h1>
  <div class="flex flex-col my-auto">
    <h2 class="text-xl font-bold text-center mb-4 break-words">
      Умер игрок {{ player.fullName }}
    </h2>
  </div>
  <UiStopwatch />
</template>
