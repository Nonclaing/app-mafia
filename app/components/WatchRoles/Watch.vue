<script setup lang="ts">
const emit = defineEmits<{
  next: [];
}>();

const props = defineProps<{
  player: GamePlayer;
}>();

const name = computed(() => props.player.fullName);
const role = computed(() => props.player.role.name || "");
const src = computed(() => props.player.role.src || "");
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold mb-8 text-center">
      Посмотри и запомни<br> свою роль
    </h1>
    <WatchRolesRole :name="name" :role="role" :src="src" />
    <UiButtonProgress class="mt-auto" :time="2000" @click="emit('next')">
      Запомнил
    </UiButtonProgress>
  </div>
</template>
