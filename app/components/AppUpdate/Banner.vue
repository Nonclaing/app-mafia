<script setup lang="ts">
const update = useAppUpdate();

const isVisible = computed(() =>
  ["AVAILABLE", "DOWNLOADING", "DOWNLOADED"].includes(update.status.value),
);

const actionLabel = computed(() => {
  if (update.status.value === "AVAILABLE" && update.strategy.value === "PATCH") {
    return `Скачать ${update.remoteVersion.value}`;
  }

  if (update.status.value === "AVAILABLE" && update.strategy.value === "NATIVE") {
    return `Обновить до ${update.remoteVersion.value}`;
  }

  if (update.status.value === "DOWNLOADED") {
    return "Обновить приложение";
  }

  return "Обновить";
});

async function onAction() {
  if (update.status.value === "AVAILABLE" && update.strategy.value === "PATCH") {
    await update.downloadPatch();
    return;
  }

  if (update.status.value === "AVAILABLE" && update.strategy.value === "NATIVE") {
    const storeUrl = useRuntimeConfig().public.appStoreUrl;
    if (storeUrl) window.open(storeUrl, "_blank", "noopener,noreferrer");
    return;
  }

  if (update.status.value === "DOWNLOADED") {
    await update.applyUpdate();
  }
}
</script>

<template>
  <section v-if="isVisible" class="rounded-2xl border p-4 shadow-sm">
    <div class="space-y-2">
      <div class="text-sm font-medium">
        Доступно обновление {{ update.remoteVersion }}
      </div>

      <p class="text-sm opacity-80">
        {{ update.releaseNotes }}
      </p>

      <div v-if="update.status === 'DOWNLOADING'" class="text-sm">
        Загрузка: {{ Math.round(update.downloadProgress) }}%
      </div>

      <button
        class="rounded-xl px-4 py-2 text-sm font-medium"
        type="button"
        @click="onAction"
      >
        {{ actionLabel }}
      </button>

      <div v-if="update.error" class="text-sm text-red-600">
        {{ update.error }}
      </div>
    </div>
  </section>
</template>
