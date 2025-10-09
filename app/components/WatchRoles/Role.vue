<script setup lang="ts">
defineProps<{
  name: string;
  src: string;
  role: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 shadow-sm rounded-md text-center py-4">
    <div>{{ role }}</div>
    <img class="w-[120px] h-[120px] object-contain" :src="src">
    <div class="p-2">
      <h2 class="font-bold">
        {{ name }}
      </h2>
    </div>
  </div>
</template>
