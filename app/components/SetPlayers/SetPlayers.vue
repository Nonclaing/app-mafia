<script setup lang="ts">
import { size } from "es-toolkit/compat";

const game = useGameStore();
const players = computed(() => game.players);

const dialog = ref<boolean>(false);
const name = ref<string>("");
const input = shallowRef();
const { focused } = useFocus(input);

const onAdd = () => {
  game.addPlayer(name.value);
  dialog.value = false;
  name.value = "";
};

const showAdd = () => {
  dialog.value = true;
  setTimeout(() => focused.value = true, 100);
};
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <Player v-for="({ name, fullName, id }) in players" :key="id" v-bind="{ fullName, name }" @delete="() => game.deletePlayer(id)" @edit="(val) => game.editPlayer(id, val)" />
  </div>
  <div class="grid grid-cols-2 gap-4 items-center mt-4">
    <div class="text-lg">
      Всего игроков: {{ size(players) }}
    </div>
    <button class="btn btn-primary self-end" @click="showAdd">
      Добавить игрока
    </button>
    <UiDialog v-model="dialog" title="Добавить игрока">
      <div>
        <div class="grid items-center grid-cols-[1fr_auto]">
          <label class="input w-full">
            Имя
            <input ref="input" :value="name" @input="(event) => name = (event.target as HTMLInputElement).value">
          </label>
        </div>
      </div>
      <button class="btn btn-primary mt-2 w-full" :disabled="!name" @click="onAdd">
        Добавить
      </button>
    </UiDialog>
  </div>
</template>
