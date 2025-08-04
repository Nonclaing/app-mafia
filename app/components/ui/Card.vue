<script setup lang="ts">
const { t } = useI18n({
  messages: {
    ru: {
      root: {
        text: "Тестовый компонент карточки", 
      },
      form: {
        submit: "Отправить",
      },
    },
  },
});
const store = useDefaultStore();
const values = computed(() => store.values);
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  store.setValues({ [target.name]: target.value });
};
</script>

<template>
  <div class="border-2 p-8 ">
    <VeeForm v-slot="{ errors }" class="grid gap-3" :initial-values="values" @submit="store.submit" @change="onChange">
      <div v-if="!isEmpty(errors)" class="mb-3 p-2 border-2 text-red-500">{{ errors }}</div>
      <div>
        <VeeField name="name" class="form-input" rules="required" />
        <VeeErrorMessage v-slot="{ message }" name="name">
          <div class="text-red-500">{{ message }}</div>
        </VeeErrorMessage>
      </div>
      <div>
        <button class="button bg-primary px-5 py-2 flex items-center gap-2 text-white">
          {{ t('form.submit') }}
          <Icon name="mdi:arrow-right" />
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<style module>

</style>