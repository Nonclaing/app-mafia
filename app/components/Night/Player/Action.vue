<script setup lang="ts">
import { includes } from "es-toolkit/compat";

const props = defineProps<{
  player: GamePlayer;
  action: NightPlayerAction;
}>();
const emit = defineEmits<{
  action: [action: NightPlayerAction, id: string];
}>();

const night = useNightStore();
const isCurrent = computed(() => night.current?.id === props.player.id);
const completedActions = computed(() => night.completedActions);

const name = computed(() => props.player.fullName);
const actionData = computed(() => ({
  kill: {
    title: `Вы точно хотите убить игрока "${name.value}"?`,
    disabled: props.player.isDead,
    btn: "Убить",
    btnColor: "btn-error",
  },
  donCheck: {
    title: `Вы точно хотите узнать роль игрока "${name.value}"?`,
    disabled: props.player.isDonChecked || !includes(completedActions.value, "kill") || isCurrent.value,
    btn: "Проверить",
    btnColor: "btn-info",
  },
  cherifCheck: {
    title: `Вы точно хотите узнать роль игрока "${name.value}"?`,
    disabled: props.player.isSherifChecked || isCurrent.value,
    btn: "Проверить",
    btnColor: "btn-info",
  },
  pass: {
    title: `Вы точно хотите закончить свой ход?`,
    disabled: false,
    btn: "Мирный пас",
    btnColor: "btn-success",
  },
}));

const onAction = () => {
  emit("action", props.action, props.player.id);
};
</script>

<template>
  <div class="w-full">
    <UiButtonConfirmation
      :title="actionData[action].title"
      @success="onAction"
    >
      <button :class="`btn btn-sm w-full ${actionData[action].btnColor}`" :disabled="includes(completedActions, action) || actionData[action].disabled">
        {{ actionData[action].btn }}
      </button>
    </UiButtonConfirmation>
  </div>
</template>
