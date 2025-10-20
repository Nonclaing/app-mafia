<script setup lang="ts">
import { size } from "es-toolkit/compat";

const { t } = useI18n();
const game = useGameStore();
const night = useNightStore();

const players = computed(() => game.gamePlayers);
const placeholder = ref<boolean>(true);

const availableActions = computed(() => night.availableActions);
const completedActions = computed(() => night.completedActions);
const current = computed(() => night.current);

const canEndTurn = computed(() => size(completedActions.value) >= size(availableActions.value));

const sounds = reactive({
  alive: useSound("/audio/day-alive.mp3"),
  dead: useSound("/audio/day-dead.mp3"),
});

const onNext = () => {
  placeholder.value = true;
  if (night.next()) return;

  const dead = night.checkKill();
  if (dead) {
    game.kill(dead);
    if (game.winner) {
      game.changeStage("end");
      navigateTo(ROUTES.game.end);
      return;
    }
    else sounds.dead.play();
  }
  else sounds.alive.play();

  game.changeStage("day");
  navigateTo(ROUTES.game.day);
};

const onAction = (action: NightPlayerAction, id: string) => {
  night.action({ action, id });
};

// TODO: аудио (выключение аудио при onMounted)
// TODO: музычка во вермя ночи
</script>

<template>
  <div class="flex flex-col h-full">
    <template v-if="placeholder">
      <h1 class="text-2xl font-bold text-center mb-4">
        {{ t('page.Night.title') }}
      </h1>
      <div class="text-2xl text-center my-auto">
        {{ t('page.Night.current', { name: current.fullName }) }}
      </div>
      <UiButtonProgress :time="1000" @click="placeholder = false">
        {{ t('start') }}
      </UiButtonProgress>
    </template>
    <template v-else>
      <div class="mb-8">
        <div class="break-words mb-4">
          {{ t('page.Night.you') }} <span class="font-bold">{{ current.role.name }}</span>
        </div>
        <h1 class="text-2xl font-bold break-words mb-4">
          {{ t('players') }}
        </h1>
        <div class="grid grid-cols-2 gap-2">
          <NightPlayer
            v-for="player in players" :key="player.id"
            v-bind="{ player }"
            @action="onAction"
          />
        </div>
      </div>
      <UiButtonProgress :time="5000" class="w-full mt-auto" :disabled="!canEndTurn" @click="onNext">
        {{ t('end') }}
      </UiButtonProgress>
    </template>
  </div>
</template>
