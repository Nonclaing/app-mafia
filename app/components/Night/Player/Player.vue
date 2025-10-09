<script setup lang="ts">
const props = defineProps<{
  player: GamePlayer;
}>();
const emit = defineEmits<{
  action: [action: NightPlayerAction, id: string];
}>();

const night = useNightStore();
const availableActions = computed(() => night.availableActions);

const name = computed(() => props.player.fullName);

const onAction = (action: NightPlayerAction) => {
  emit("action", action, props.player.id);
};
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 shadow-sm rounded-md text-center relative p-2 py-4">
    <NightPlayerRole v-bind="{ player }" />
    <div class="p-2">
      <h2 class="font-bold break-words">
        {{ name }}
      </h2>
    </div>
    <div class="flex flex-wrap gap-2 w-full">
      <NightPlayerAction v-for="action in availableActions" :key="action" class="flex-[1_1_calc(50%-var(--spacing))]" v-bind="{ player, action }" @action="onAction" />
    </div>
  </div>
</template>
