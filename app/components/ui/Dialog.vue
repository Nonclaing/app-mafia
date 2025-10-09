<script setup lang="ts">
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
const props = defineProps<{
  title?: string;
  description?: string;
  modelValue?: boolean;
}>();
const open = ref(false);
const onClose = () => emit("update:modelValue", false);
watchEffect(() => (open.value = props.modelValue));
</script>

<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="overflow-hidden">
        <button class="btn text-lg float-end" @click="onClose">
          <Icon name="mdi:window-close" />
        </button>
        <h3 v-if="title" class="text-lg font-bold py-1">
          {{ title }}
        </h3>
      </div>
      <slot v-bind="{ open }" />
    </div>
    <div class="modal-backdrop" @click="onClose" />
  </dialog>
</template>
