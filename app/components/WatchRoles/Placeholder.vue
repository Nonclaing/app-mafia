<script setup lang="ts">
const emit = defineEmits<{
  show: [];
}>();
defineProps<{
  name: string;
}>();
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold mb-8 text-center" v-html="t('components.WatchRoles.Placeholder.title')" />
    <div class="text-2xl text-center my-auto">
      {{ t('components.WatchRoles.Placeholder.current', { name }) }}
    </div>
    <UiButtonProgress class="mt-auto" :time="2000" @click="emit('show')">
      {{ t('components.WatchRoles.Placeholder.open') }}
    </UiButtonProgress>
  </div>
</template>
