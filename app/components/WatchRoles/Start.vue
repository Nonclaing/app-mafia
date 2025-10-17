<script setup lang="ts">
const emit = defineEmits<{
  start: [];
}>();
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold mb-8 text-center" v-html="t('components.WatchRoles.Start.title')"></h1>
    <UiButtonProgress class="mt-auto" :time="2000" @click="emit('start')">
      {{ t('startGame') }}
    </UiButtonProgress>
  </div>
</template>
