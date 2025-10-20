<script setup lang="ts">
useSchemaOrg([
  defineOrganization({
    name: "Nuxt App SEO",
  }),
  defineWebSite({
    name: "Nuxt App Schema.org",
  }),
  defineWebPage(),
]);
// TODO: работа со звуками
// TODO: роли доступа
// TODO: режим ведущего
// TODO: настройки
// TODO: PWA
// TODO: офлайн режим
// TODO: API
// TODO: онлайн режим
// TODO: автозаполнение ролей
// TODO: режим убийства не в слепую
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
