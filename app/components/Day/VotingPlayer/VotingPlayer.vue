<script setup lang="ts">
const props = defineProps<{
  player: DayPlayer;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  vote: [value: string];
}>();
const name = computed(() => props.player.fullName);

const onSuccess = () => {
  emit("vote", props.player.id);
};
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 shadow-sm rounded-md text-center relative p-2 py-4">
    <img class="w-[60px] h-[60px] object-contain" src="/images/mafia.png">
    <div class="p-2">
      <h2 class="font-bold break-words">
        {{ name }}
      </h2>
    </div>
    <UiButtonConfirmation class="mt-auto" :title="`Вы точно хотите проголосовать за игрока ${name}`" @success="onSuccess">
      <button class="btn btn-primary" :disabled="disabled">
        Проголосовать
      </button>
    </UiButtonConfirmation>
  </div>
</template>
