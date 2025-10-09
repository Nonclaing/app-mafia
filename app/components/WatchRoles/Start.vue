<script setup lang="ts">
const emit = defineEmits<{
  start: [];
}>();
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold mb-8 text-center">
      Передай телефон первому игроку.
    </h1>
    <UiButtonProgress class="mt-auto" :time="2000" @click="emit('start')">
      Начать игру
    </UiButtonProgress>
  </div>
</template>
