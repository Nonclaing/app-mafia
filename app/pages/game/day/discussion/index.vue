<script setup lang="ts">
const { t } = useI18n();
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
        {{ t('page.Day.Discussion.title') }}
      </h1>
    </div>
    <div class="text-xl font-bold text-center mb-4 break-words">
      {{ t('page.Day.Discussion.say') }}"{{ current.fullName }}":
    </div>
    <UiStopwatch :key="current.id" class="mt-auto pb-4" />
    <div :key="current.id" class="mt-auto">
      <DayPutToVote />
      <UiButtonConfirmation title="Вы точно хотите закончить свой ход?" @success="onNext">
        <UiButtonProgress class="w-full">
          {{ t('continue') }}
        </UiButtonProgress>
      </UiButtonConfirmation>
    </div>
  </div>
</template>
