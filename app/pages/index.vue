<script setup lang="ts">
import getDetail from "~/api/services/default/get";

const { t } = useI18n();

useHead({
  title: t("pages.root.title"),
});

watchEffect(() => {
  getDetail("1");
});
</script>

<template>
  <div>
    <UiCard />
  </div>
</template>

<style module>

</style>
