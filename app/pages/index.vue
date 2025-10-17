<script setup lang="ts">
const { t } = useI18n();
const game = useGameStore();
const night = useNightStore();
const day = useDayStore();
const players = computed(() => game.players);
const allRolesCount = computed(() => game.allRolesCount);

const onStart = () => {
  game.spreadRoles();
  game.changeStage("watchRoles");
  night.setInitial(game.gamePlayers);
  day.setInitial();
  navigateTo(ROUTES.game.watchRoles);
};
</script>

<template>
  <div>
    <section class="mb-10">
      <h2 class="text-xl font-bold mb-8">
        {{ t('players') }}
      </h2>
      <div class="flex flex-col">
        <SetPlayers />
      </div>
    </section>
    <section class="mb-10">
      <h2 class="text-xl font-bold mb-8">
        {{ t('roles') }}
      </h2>
      <div class="flex flex-col">
        <SelectRoles />
      </div>
    </section>
    <button class="btn btn-primary uppercase mt-4 w-full" :disabled="useSize(players) !== allRolesCount || !useSize(players)" @click="onStart">
      {{ t('startGame') }}
    </button>
  </div>
</template>
