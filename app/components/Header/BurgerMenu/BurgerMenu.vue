<script lang="ts" setup>
</script>

<template>
  <div class="drawer drawer-end">
    <input id="my-drawer-5" type="checkbox" class="drawer-toggle">
    <label for="my-drawer-5" class="drawer-button ms-auto">
      <Icon name="mdi:menu" size="32" />
    </label>
    <div class="drawer-side">
      <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay" />
      <div class="menu bg-base-200 min-h-full w-full py-2 px-4">
        <div class="flex gap-4">
          <div class="text-xl font-bold">
            Параметры
          </div>
          <label for="my-drawer-5" class="drawer-button ms-auto">
            <Icon name="mdi:close" size="32" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
