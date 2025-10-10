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
// TODO: голосования
// TODO: конец игры
// TODO: редиректы
// TODO: список выставленных на голосование
// TODO: работа со звуками
// TODO: роли доступа
// TODO: режим ведущего
// TODO: настройки
// TODO: PWA
// TODO: офлайн режим
// TODO: API
// TODO: онлайн режим
// TODO: автозаполнение ролей
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
