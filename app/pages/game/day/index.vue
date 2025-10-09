<script setup lang="ts">
const game = useGameStore();
const night = useNightStore();
const day = useDayStore();
const deadPlayer = computed(() => night.checkKill());

const onClick = () => {
  game.changeStage("dayDiscussion");
  day.setInitial(game.gamePlayers);
  navigateTo(ROUTES.game.dayDiscussion);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold text-center mb-4 break-words">
      <template v-if="deadPlayer">
        Финальная речь игрока
      </template>
      <template v-else>
        Нажмите продолжить для начала переговоров
      </template>
    </h1>
    <div class="flex flex-col my-auto">
      <h2 class="text-xl font-bold text-center mb-4 break-words">
        <template v-if="deadPlayer">
          Умер игрок "{{ deadPlayer.name }}" ({{ deadPlayer.number }})
        </template>
        <template v-else>
          Никто не умер
        </template>
      </h2>
    </div>
    <UiStopwatch v-if="deadPlayer" />
    <UiButtonConfirmation title="Вы точно хотите начать переговоры?" @success="onClick">
      <UiButtonProgress :time="8000" class="w-full mt-6">
        Продолжить
      </UiButtonProgress>
    </UiButtonConfirmation>
  </div>
</template>
