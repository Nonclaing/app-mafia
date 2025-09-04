<script setup lang="ts">
import getDetail from "~/api/services/item/get";

const { t } = useI18n();
const { can } = useAbility();
const { data } = await useAsyncData("item", () => getDetail("1"));

useHead({
  title: t("pages.root.title"),
});
</script>

<template>
  <div class="container mx-auto">
    <div class="prose">
      <div class="grid gap-4">
        <div>
          <h2>Пример ограничения по ролям</h2>
          <div>
            {{ ActionType.Read }} - {{ SubjectType.Item }} - {{ can(ActionType.Read, SubjectType.Item) }}
          </div>
        </div>
        <div>
          <h2>Пример компонента формы</h2>
          <UiCard />
        </div>
        <div>
          {{ data }}
        </div>
      </div>
    </div>
  </div>
</template>

<style module>

</style>
