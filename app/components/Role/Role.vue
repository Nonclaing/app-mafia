<script setup lang="ts">
const emit = defineEmits<{
  "update:model-value": [value: number];
}>();

withDefaults(defineProps<{
  src: string;
  name: string;
  value?: number;
}>(), {
  value: 0,
});
const update = (value: number) => {
  const count = +value < 0 ? 0 : +value;
  emit("update:model-value", count);
};
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 shadow-sm rounded-md text-center py-4">
    <img class="w-[120px] h-[120px] object-contain" :src="src">
    <div class="p-2">
      <h2 class="font-bold">
        {{ name }}
      </h2>
    </div>
    <div class="mt-1 w-[120px]">
      <Counter :value="value" @update:model-value="update" />
    </div>
  </div>
</template>
