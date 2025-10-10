<script setup lang="ts">
import { compact, get, groupBy, join, keys, map, max } from "es-toolkit/compat";
import { useGet } from "#imports";

const { t } = useI18n();
const game = useGameStore();
const day = useDayStore();
const night = useNightStore();
const resultVotes = computed(() => {
  const voted = groupBy(day.players, ({ completedActions }) => get(completedActions, "toVote.id", ""));
  const idArray = groupBy(day.players, ({ completedActions }) => get(completedActions, "vote.id", ""));
  const countVote = useSize(keys(idArray));
  return compact(map(day.players, (player) => {
    const list = countVote === 1 ? voted[player.id] : idArray[player.id];
    if (list) return {
      id: player.id,
      fullName: player.fullName,
      list: join(map(list, "fullName"), ", "),
      count: useSize(list),
    };
    return;
  }));
});

const groupByCount = computed(() => groupBy(resultVotes.value, "count"));
const maxCount = computed(() => max(keys(groupByCount.value)) || 0);
const sameVotes = computed(() => useSize(useGet(groupByCount.value, [maxCount.value], [])) > 1);
const kickedPlayer = computed(() => get(groupByCount.value, [maxCount.value, 0]));

const onRepeatVoting = () => {

};

const onContinue = () => {
  night.reset();
  if (kickedPlayer.value) game.kick(kickedPlayer.value.id);
  if (game.winner) {
    game.changeStage("end");
    navigateTo(ROUTES.game.end);
  }
  else {
    game.changeStage("night");
    navigateTo(ROUTES.game.night);
  }
};

// TODO: последняя минута изгнанного
// TODO: если выставлен один, он сразу кикнут
// TODO: попил, второй голосование, после голосование если не попилили
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-center mb-4">
        {{ t('page.Day.VotingResult.title') }}
      </h1>
    </div>
    <div class="grid grid-cols-1 gap-4 break-words mb-4">
      <div v-for="{ fullName, list, count } in resultVotes" :key="fullName">
        <span class="text-xl">
          {{ fullName }} -
        </span>
        <span class="font-bold">
          <span class="text-lg text-primary">{{ count }}</span> {{ t('vote', count) }}:
        </span>
        <span>{{ list }}</span>
      </div>
    </div>
    <div class="my-auto">
      <div v-if="sameVotes" class="mb-4">
        <div class="text-xl font-bold text-center">
          {{ t('page.Day.VotingResult.notOneKick') }}
        </div>
      </div>
      <div v-else class="mb-4">
        <template v-if="kickedPlayer">
          <div class="text-xl font-bold text-center">
            {{ t('page.Day.VotingResult.kicked', { name: kickedPlayer.fullName }) }}
          </div>
          <UiStopwatch />
        </template>
        <div v-else class="text-xl font-bold text-center">
          {{ t('page.Day.VotingResult.noKick') }}
        </div>
      </div>
    </div>
    <UiButtonProgress v-if="sameVotes" class="w-full mt-auto" @click="onRepeatVoting">
      {{ t('page.Day.VotingResult.nextVote') }}
    </UiButtonProgress>
    <UiButtonProgress v-else class="w-full mt-auto" @click="onContinue">
      {{ t('continue') }}
    </UiButtonProgress>
  </div>
</template>
