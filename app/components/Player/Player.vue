<script setup lang="ts">
const emit = defineEmits<{
  edit: [value: string];
  delete: [];
}>();

const props = defineProps<{
  name: string;
  fullName: string;
}>();

const nameRef = toRef<string>(props.name);
const dialogChange = ref<boolean>(false);
const dialogDelete = ref<boolean>(false);
const input = shallowRef();
const { focused } = useFocus(input);

const showChange = () => {
  dialogChange.value = true;
  setTimeout(() => focused.value = true, 100);
};

const onEdit = () => {
  emit("edit", nameRef.value);
  dialogChange.value = false;
};

const onDelete = () => {
  emit("delete");
  dialogDelete.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center bg-base-100 shadow-sm rounded-md text-center relative p-2 pt-6">
    <button class="text-primary absolute p-2 top-0 left-0" @click="showChange">
      <Icon name="mdi:pencil" size="24" />
    </button>
    <button class="text-primary absolute p-2 top-0 right-0" @click="dialogDelete = true">
      <Icon name="mdi:trash" size="24" />
    </button>
    <img class="w-[120px] h-[120px] object-contain" src="/images/mafia.png">
    <div class="p-2">
      <h2 class="font-bold break-words">
        {{ fullName }}
      </h2>
    </div>
    <UiDialog v-model="dialogChange" title="Изменить имя">
      <div>
        <div class="grid grid-cols-[1fr_auto]">
          <label class="input w-full">
            Имя
            <input ref="input" :value="nameRef" @input="(event) => nameRef = (event.target as HTMLElement).value">
          </label>
        </div>
        <button class="btn btn-primary mt-2 w-full" :disabled="!nameRef" @click="onEdit">
          Изменить
        </button>
      </div>
    </UiDialog>
    <UiDialog v-model="dialogDelete" title="Удалить игрока?">
      <div>
        Вы действительно хотите удалить игрока "{{ name }}"?
        <div class="grid grid-cols-2 gap-4 mt-4">
          <button class="btn btn-outline mt-2" @click="dialogDelete = false">
            Отмена
          </button>
          <button class="btn btn-primary mt-2" @click="onDelete">
            Удалить
          </button>
        </div>
      </div>
    </UiDialog>
  </div>
</template>
