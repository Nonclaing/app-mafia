<script setup lang="ts">
import { compact, get, groupBy, join, keys, map, max } from "es-toolkit/compat";
import { usePlural } from "~/composables/usePlural";

const day = useDayStore();
const resultVotes = computed(() => {
  const idArray = groupBy(day.players, ({ completedActions }) => get(completedActions, "vote.id", ""));
  return compact(map(day.players, (player) => {
    const list = idArray[player.id];
    if (list) return {
      fullName: player.fullName,
      list: join(map(list, "fullName"), ", "),
      count: list.length,
    };
  }));
});

const groupByCount = computed(() => groupBy(resultVotes.value, "count"));
const maxCount = computed(() => max(keys(groupByCount.value)));
const sameVotes = computed(() => groupByCount.value[maxCount.value].length > 1);
const kickedPlayer = computed(() => {
  return groupByCount.value;
});

// TODO: последняя минута изгнанного
// TODO: попил, второй голосование, после голосование если не попилили
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-center mb-4">
        Результат голосования
      </h1>
    </div>
    <div class="grid grid-cols-1 gap-4 break-words">
      <div v-for="{ fullName, list, count } in resultVotes" :key="fullName">
        <span class="text-xl">
          {{ fullName }} -
        </span>
        <span class="font-bold">
          <span class="text-lg text-primary">{{ count }}</span> {{ usePlural(count, ['голос', 'голоса', 'голосов']) }}:
        </span>
        <span>{{ list }}</span>
      </div>
    </div>
    <div class="mt-5">
      <div v-if="!sameVotes" class="text-xl font-bold text-center mb-4">
        Был изгнан игрок: {{ groupByCount[maxCount][0].fullName }}
      </div>
      <div v-else class="text-xl font-bold text-center mb-4">
        Никто не был изгнан. Объявляется второй раунд голосования
      </div>
    </div>
    <UiButtonProgress class="w-full mt-auto">
      Продолжить
    </UiButtonProgress>
  </div>
</template>
