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

const appUpdate = useAppUpdate();

onMounted(() => {
  appUpdate.init().catch(console.error);
});
// TODO: работа со звуками
// TODO: роли доступа
// TODO: режим ведущего
// TODO: настройки
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
