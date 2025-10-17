<script setup lang="ts">
import { includes } from "es-toolkit/compat";

const props = defineProps<{
  player: GamePlayer;
  action: NightPlayerAction;
}>();
const emit = defineEmits<{
  action: [action: NightPlayerAction, id: string];
}>();

const { t } = useI18n();
const night = useNightStore();
const isCurrent = computed(() => night.current?.id === props.player.id);
const completedActions = computed(() => night.completedActions);

const name = computed(() => props.player.fullName);
const actionData = computed(() => ({
  kill: {
    disabled: props.player.state.kill || props.player.state.kick,
    btnColor: "btn-error",
  },
  donCheck: {
    disabled: props.player.state.donCheck || !includes(completedActions.value, "kill") || isCurrent.value,
    btnColor: "btn-info",
  },
  sheriffCheck: {
    disabled: props.player.state.sheriffCheck || isCurrent.value,
    btnColor: "btn-info",
  },
  pass: {
    disabled: !isCurrent.value,
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
      :title="t(`components.Night.Player.Action.data.${action}.title`, { name })"
      @success="onAction"
    >
      <button :class="`btn btn-sm w-full ${actionData[action].btnColor}`" :disabled="includes(completedActions, action) || actionData[action].disabled">
        {{ t(`components.Night.Player.Action.data.${action}.btn`) }}
      </button>
    </UiButtonConfirmation>
  </div>
</template>
