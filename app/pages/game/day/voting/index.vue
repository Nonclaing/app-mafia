<script setup lang="ts">
import { compact, filter, includes, isEmpty, map, uniq } from "es-toolkit/compat";

const game = useGameStore();
const day = useDayStore();
const current = computed(() => day.current);
const placeholder = ref<boolean>(true);

const availablePlayers = computed(() => {
  const inVote = compact(uniq(map(day.players, ({ completedActions }) => completedActions["toVote"]?.id)));
  return filter(day.players, ({ id }) => includes(inVote, id) && current.value.id !== id);
});

const onVote = (id: string) => {
  day.action({ action: "vote", id });
};

const onNext = () => {
  placeholder.value = true;
  if (day.next()) return;

  game.changeStage("dayVotingResult");
  navigateTo(ROUTES.game.dayVotingResult);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-center mb-1">
        Голосование
      </h1>
    </div>
    <div class="text-xl font-bold text-center mb-4 break-words">
      Выбирает игрок: {{ current.fullName }}
    </div>
    <div v-if="!placeholder" class="grid grid-cols-2 gap-4">
      <DayVotingPlayer v-for="player in availablePlayers" :key="player.id" v-bind="{ player }" :disabled="!isEmpty(current.completedActions['vote'])" @vote="onVote" />
    </div>
    <UiButtonProgress v-if="placeholder" class="w-full mt-auto" @click="placeholder = false">
      Начать
    </UiButtonProgress>
    <UiButtonProgress v-else class="w-full mt-auto" :disabled="isEmpty(current.completedActions['vote'])" @click="onNext">
      Продолжить
    </UiButtonProgress>
  </div>
</template>
