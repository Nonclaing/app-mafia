<script setup lang="ts">
defineProps<{
  title: string;
}>();
const emit = defineEmits<{
  success: [];
  reject: [];
}>();

const { t } = useI18n();
const show = ref<boolean>(false);
const onSuccess = () => {
  show.value = false;
  emit("success");
};

const onReject = () => {
  show.value = false;
  emit("reject");
};
</script>

<template>
  <div>
    <div @click="show = true">
      <slot />
    </div>
    <UiDialog v-model="show" :title="t('confirm')" @update:model-value="(v) => !v && onReject()">
      <div class="mt-4">
        {{ title }}
        <div class="grid grid-cols-2 gap-4 mt-4">
          <button class="btn btn-outline mt-2" @click="onReject">
            {{ t('cancel') }}
          </button>
          <button class="btn btn-primary mt-2" @click="onSuccess">
            {{ t('yes') }}
          </button>
        </div>
      </div>
    </UiDialog>
  </div>
</template>
