<script setup lang="ts">
const game = useGameStore();
const roles = computed(() => game.roles);
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <Role
        v-for="({ name, src, count, id }) in roles"
        :key="id" v-bind="{ name, src }"
        :value="count"
        :src="src"
        :disabled="id === 'peaceful'"
        @update:model-value="(value) => game.updateRole(id, value)"
      />
    </div>
    <div class="mt-4 text-lg">
      Всего ролей: {{ game.allRolesCount }}
    </div>
  </div>
</template>
