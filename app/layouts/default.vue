<script setup lang="ts">
// TODO: ClientOnly так как пока используется localStorage, в будущем нужно от него отказаться и запрашивать данные из API
</script>

<template>
  <div class="flex justify-center px-4 h-full flex-1">
    <div class="container py-6">
      <ClientOnly>
        <slot />
        <AppUpdateBanner />
      </ClientOnly>
    </div>
  </div>
</template>
