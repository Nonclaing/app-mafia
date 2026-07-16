<script setup lang="ts">
const { t } = useI18n();
const sounds = reactive({
  start: useSound(useAssetUrl("/audio/mafia-knowing-start.mp3"), { onend: () => {
    stage.value = "wait";
  } }),
  end: useSound(useAssetUrl("/audio/mafia-knowing-end.mp3"), { onend: () => {
    sounds.dayStart.play();
    game.changeStage("dayDiscussion");
    day.startDay();
    navigateTo(ROUTES.game.dayDiscussion);
  } }),
  dayStart: useSound(useAssetUrl("/audio/night-start.mp3")), // TODO: поменять аудио
});

const game = useGameStore();
const day = useDayStore();
const stage = ref<"start" | "startSound" | "wait" | "end">("start");

const onStart = () => {
  sounds.start.play();
  stage.value = "startSound";
};

const onTimerEnd = () => {
  sounds.end.play();
  stage.value = "end";
};
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold text-center mb-4">
      {{ t('page.MafiaKnowing.title') }}
    </h1>
    <h1 v-if="stage === 'start'" class="text-3xl font-bold text-center my-auto" v-html="t('page.MafiaKnowing.start')" />
    <div v-if="stage === 'wait'" class="m-auto">
      <UiTimer :time="30_000" with-sound @update:end="onTimerEnd" />
    </div>
    <button v-if="stage === 'start'" class="btn btn-primary mt-auto" @click="onStart">
      {{ t('start') }}
    </button>
  </div>
</template>
