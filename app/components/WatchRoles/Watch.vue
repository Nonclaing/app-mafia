<script setup lang="ts">
const emit = defineEmits<{
  next: [];
}>();

const props = defineProps<{
  player: GamePlayer;
}>();

const { t } = useI18n();
const name = computed(() => props.player.fullName);
const role = computed(() => props.player.role.name || "");
const src = computed(() => props.player.role.src || "");
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-2xl font-bold mb-8 text-center" v-html="t('components.WatchRoles.Watch.title')" />
    <WatchRolesRole :name="name" :role="role" :src="src" />
    <UiButtonProgress class="mt-auto" :time="2000" @click="emit('next')">
      {{ t('components.WatchRoles.Watch.remember') }}
    </UiButtonProgress>
  </div>
</template>
