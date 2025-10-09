<script setup lang="ts">
const game = useGameStore();
const night = useNightStore();
const players = computed(() => game.players);
const allRolesCount = computed(() => game.allRolesCount);

const onStart = () => {
  game.spreadRoles();
  game.changeStage("showRoles");
  night.setInitial(game.gamePlayers);
  navigateTo(ROUTES.game.watchRoles);
};
</script>

<template>
  <div>
    <section class="mb-10">
      <h2 class="text-xl font-bold mb-8">
        Игроки
      </h2>
      <div class="flex flex-col">
        <SetPlayers />
      </div>
    </section>
    <section class="mb-10">
      <h2 class="text-xl font-bold mb-8">
        Роли
      </h2>
      <div class="flex flex-col">
        <SelectRoles />
      </div>
    </section>
    <button class="btn btn-primary uppercase mt-4 w-full" :disabled="useSize(players) !== allRolesCount || !useSize(players)" @click="onStart">
      Начать игру
    </button>
  </div>
</template>
