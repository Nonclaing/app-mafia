<script lang="ts" setup>
import { compact, filter, forEach, includes, join } from "es-toolkit/compat";

const { t } = useI18n();
const day = useDayStore();
const game = useGameStore();
const night = useNightStore();

const votedPlayersId = computed(() => compact(useMap(day.players, ({ completedActions }) => completedActions["toVote"]?.id)));
const votedPlayers = computed(() => filter(day.players, ({ id }) => includes(votedPlayersId.value, id)));
const voteToSave = computed(() => filter(day.players, ({ completedActions }) => completedActions["save"]));
const voteToKick = computed(() => filter(day.players, ({ completedActions }) => completedActions["kick"]));
const isKicked = computed(() => useSize(voteToKick.value) > useSize(voteToSave.value));
const hasNext = ref(true);

const onEnd = () => {
  if (isKicked.value) forEach(votedPlayersId.value, (id) => game.kick(id));
  night.reset();
  if (game.winner) {
    game.changeStage("end");
    navigateTo(ROUTES.game.end);
  }
  else {
    game.changeStage("night");
    navigateTo(ROUTES.game.night);
  }
};

const onSave = () => {
  day.action({ action: "save", id: day.current.id });
  next();
};

const onKick = () => {
  day.action({ action: "kick", id: day.current.id });
  next();
};

const next = () => {
  hasNext.value = day.next();
  if (hasNext.value) {
    while (hasNext.value && includes(votedPlayersId.value, day.current.id)) hasNext.value = day.next();
  }
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-center mb-4">
        {{ t('page.Day.VotingFinal.title') }}
      </h1>
    </div>
    <template v-if="hasNext">
      <div class="my-auto">
        <div class="mb-8">
          <span class="text-xl font-bold">{{ t('page.Day.VotingFinal.voting') }}</span>
          <span class="text-2xl">{{ day.current.fullName }}</span>
        </div>
        <div>
          <span class="font-bold">{{ t('page.Day.VotingFinal.votingList') }}</span>
          {{ join(useMap(votedPlayers, ({ fullName }) => fullName), ', ') }}
        </div>
      </div>
      <div>
        <UiButtonConfirmation class="w-full mb-4" :title="t('page.Day.VotingFinal.saveConfirmation')" @success="onSave">
          <UiButtonProgress class="w-full">
            {{ t('toSave') }}
          </UiButtonProgress>
        </UiButtonConfirmation>
        <UiButtonConfirmation class="w-full mb-4" :title="t('page.Day.VotingFinal.kickConfirmation')" @success="onKick">
          <UiButtonProgress class="w-full btn-secondary">
            {{ t('toKick') }}
          </UiButtonProgress>
        </UiButtonConfirmation>
      </div>
    </template>
    <template v-else>
      <div class="text-xl text-center font-bold my-8">
        <template v-if="isKicked">
          {{ t('page.Day.VotingFinal.isKicked') }}
        </template>
        <template v-else>
          {{ t('page.Day.VotingFinal.isSaved') }}
        </template>
      </div>
      <div class="mb-2">
        <span class="font-bold">{{ t('page.Day.VotingFinal.forKick') }}</span>
        {{ join(useMap(voteToKick, 'fullName'), ', ') }}
      </div>
      <div class="mb-2">
        <span class="font-bold">{{ t('page.Day.VotingFinal.forSave') }}</span>
        {{ join(useMap(voteToSave, 'fullName'), ', ') }}
      </div>

      <div class="mt-auto">
        <UiStopwatch v-if="isKicked" class="mb-4" />
        <UiButtonProgress class="w-full" @click="onEnd">
          {{ t('continue') }}
        </UiButtonProgress>
      </div>
    </template>
  </div>
</template>
