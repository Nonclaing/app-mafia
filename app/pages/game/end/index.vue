<script lang="ts" setup>
const { t } = useI18n();
const game = useGameStore();
const players = computed(() => game.gamePlayers);
const role = computed(() => game.winner && useGet(game.roles, [game.winner, "name"]));
const onMainMenu = () => {
  game.changeStage("startMenu");
  navigateTo(ROUTES.game.startMenu);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold text-center mb-8">
      {{ t('page.End.title') }}
    </h1>
    <div class="text-xl font-bold text-center mb-8">
      {{ t('page.End.winner', { role }) }}
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4">
      <EndPlayer
        v-for="player in players" :key="player.id"
        v-bind="{ player }"
      />
    </div>
    <button class="btn btn-primary mt-auto w-full" @click="onMainMenu">
      {{ t('page.End.mainMenu') }}
    </button>
  </div>
</template>
