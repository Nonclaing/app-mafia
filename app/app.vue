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
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
