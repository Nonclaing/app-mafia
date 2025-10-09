<script setup lang="ts">
const game = useGameStore();
const day = useDayStore();
const current = computed(() => day.current);

const onNext = () => {
  if (day.next()) return;

  game.changeStage("dayVoting");
  day.resetSteps();
  navigateTo(ROUTES.game.dayVoting);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-center mb-1">
        Обсуждения
      </h1>
    </div>
    <div class="text-xl font-bold text-center mb-4 break-words">
      Говорит игрок: "{{ current.name }}":
    </div>
    <UiStopwatch :key="current.id" class="mt-auto pb-4" />
    <div :key="current.id" class="mt-auto">
      <DayPutToVote />
      <UiButtonConfirmation title="Вы точно хотите закончить свой ход?" @success="onNext">
        <UiButtonProgress class="w-full">
          Продолжить
        </UiButtonProgress>
      </UiButtonConfirmation>
    </div>
  </div>
</template>
