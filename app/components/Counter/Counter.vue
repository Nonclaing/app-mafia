<script setup lang="ts">
const emit = defineEmits<{
  "update:model-value": [value: number];
}>();

const props = defineProps<{
  value?: number;
}>();

const onClick = (count: number) => {
  emit("update:model-value", +(props.value || 0) + count);
};
</script>

<template>
  <div class="flex">
    <button class="btn btn-outline text-primary flex items-center justify-center p-0 w-[32px] h-[32px]" @click="() => onClick(-1)">
      <Icon name="mdi:minus" size="16" />
    </button>
    <div class="grow-1">
      {{ value || 0 }}
    </div>
    <button class="btn btn-outline text-primary flex items-center justify-center p-0 w-[32px] h-[32px]" @click="() => onClick(1)">
      <Icon name="mdi:plus" size="16" />
    </button>
  </div>
</template>
