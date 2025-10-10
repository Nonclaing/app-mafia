<script setup lang="ts">
import { get, size } from "es-toolkit/compat";

const game = useGameStore();
const players = computed(() => game.gamePlayers);
const currentIdx = ref(0);
const current = computed(() => get(players.value, currentIdx.value));
const state = ref<"watch" | "placeholder" | "start">("placeholder");

const onNext = () => {
  state.value = "placeholder";
  currentIdx.value += 1;
  if (currentIdx.value >= size(players.value)) state.value = "start";
};

const onStart = () => {
  game.changeStage("night");
  navigateTo(ROUTES.game.mafiaKnowing);
};
</script>

<template>
  <WatchRolesWatch v-if="state === 'watch'" :player="current" @next="onNext" />
  <WatchRolesPlaceholder v-else-if="state === 'placeholder'" @show="state = 'watch'" />
  <WatchRolesStart v-else @start="onStart" />
</template>
