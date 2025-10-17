<script setup lang="ts">
import { filter, isEmpty } from "es-toolkit/compat";

const { t } = useI18n();
const show = ref<boolean>(false);
const game = useGameStore();
const day = useDayStore();
const availablePlayers: ComputedRef<GamePlayer[]> = computed(() => filter(game.gamePlayers, ({ state }) => !state.kill && !state.kick));
const current = computed(() => day.current);

const onVote = (id: string) => {
  show.value = false;
  day.action({ action: "toVote", id });
};
</script>

<template>
  <button class="btn btn-secondary w-full mb-4" :disabled="!isEmpty(current.completedActions['toVote'])" @click="show = true">
    {{ t('components.Day.PutToVote.toVote') }}
  </button>
  <UiDialog v-model="show" :title="t('components.Day.PutToVote.chose')">
    <div class="grid grid-cols-2 gap-4">
      <DayPlayer v-for="player in availablePlayers" :key="player.id" v-bind="{ player }" @to-vote="onVote" />
    </div>
  </UiDialog>
</template>
