<script setup lang="ts">
import { find } from "es-toolkit/compat";

const { t } = useI18n();
const game = useGameStore();
const night = useNightStore();
const day = useDayStore();
const deadPlayerId = computed(() => night.checkKill());
const deadPlayer = computed(() => find(game.gamePlayers, { id: deadPlayerId.value }) as GamePlayer);

const onClick = () => {
  game.changeStage("dayDiscussion");
  day.startDay();
  navigateTo(ROUTES.game.dayDiscussion);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold text-center mb-4 break-words">
      <template v-if="deadPlayer">
        {{ t('page.Day.finalTitle') }}
      </template>
      <template v-else>
        {{ t('page.Day.nextTitle') }}
      </template>
    </h1>
    <div class="flex flex-col my-auto">
      <h2 class="text-xl font-bold text-center mb-4 break-words">
        <template v-if="deadPlayer">
          {{ t('page.Day.dead') }} "{{ deadPlayer.fullName }}"
        </template>
        <template v-else>
          {{ t('page.Day.noDead') }}
        </template>
      </h2>
    </div>
    <UiStopwatch v-if="deadPlayer" />
    <UiButtonConfirmation :title="t('page.Day.confirm')" @success="onClick">
      <UiButtonProgress :time="8000" class="w-full mt-6">
        {{ t('continue') }}
      </UiButtonProgress>
    </UiButtonConfirmation>
  </div>
</template>
