<script setup lang="ts">
import { size } from "es-toolkit/compat";

const checkHttp = async () => {
  const username = "intervolga";
  const password = "intervolga34";
  const auth = btoa(`${username}:${password}`);
  const { data } = await useFetch("https://bugzilla.ivdev.ru/", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  alert(data.value);
};

const game = useGameStore();
const night = useNightStore();
const players = computed(() => game.players);
const allRolesCount = computed(() => game.allRolesCount);

const { $appUpdater } = useNuxtApp();

const version = computedAsync(async () => {
  return await $appUpdater.getAppVersion();
});

const onStart = () => {
  game.spreadRoles();
  game.changeStage("watchRoles");
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
    <button class="btn btn-primary uppercase mt-4 w-full" :disabled="size(players) !== allRolesCount || !size(players)" @click="onStart">
      Начать игру
    </button>

    <MobileCameraButton />
    <MobileNotificationButton />
    <a class="link block mb-4" href="https://habr.com/ru/articles/844612/">ссылка на внешний сервис внутри приложения</a>
    <a class="link block" href="https://developer.android.com/studio/debug?hl=ru#groovy">ссылка на внешний сервис внутри отдельного браузера</a>
    <button class="btn" @click="checkHttp">
      проверка http авторизации
    </button>
    <div>проверка стандартного обновления {{ version }}</div>
  </div>
</template>
