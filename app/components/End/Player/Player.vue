<script setup lang="ts">
const props = defineProps<{
  player: GamePlayer;
}>();

const name = computed(() => props.player.fullName);
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 shadow-sm rounded-md text-center relative p-2 py-4">
    <div class="flex-1">
      <div class="flex flex-col gap-1 items-center justify-center">
        <div class="font-bold ">
          {{ player.role.name }}
        </div>
        <div v-if="player.state.kick">
          Исключён
        </div>
        <div v-if="player.state.kill">
          Убит
        </div>
        <img class="w-[60px] h-[60px] object-contain mt-2" :src="player.role.src">
      </div>
    </div>
    <div class="p-2">
      <h2 class="font-bold break-words">
        {{ name }}
      </h2>
    </div>
  </div>
</template>
