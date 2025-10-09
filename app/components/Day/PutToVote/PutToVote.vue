<script setup lang="ts">
import { filter, isEmpty } from "es-toolkit/compat";

const show = ref<boolean>(false);
const game = useGameStore();
const day = useDayStore();
const availablePlayers: ComputedRef<GamePlayer[]> = computed(() => filter(game.gamePlayers, ({ isDead, id }) => !isDead && id !== current.value.id));
const current = computed(() => day.current);

const onVote = (id: string | number) => {
  show.value = false;
  day.action({ action: "toVote", id });
};
</script>

<template>
  <button class="btn btn-secondary w-full mb-4" :disabled="!isEmpty(current.completedActions['toVote'])" @click="show = true">
    Выставить на голосование
  </button>
  <UiDialog v-model="show" title="Выберите игрока для выставления">
    <div class="grid grid-cols-2 gap-4">
      <DayPlayer v-for="player in availablePlayers" :key="player.id" v-bind="{ player }" @to-vote="onVote" />
    </div>
  </UiDialog>
</template>
