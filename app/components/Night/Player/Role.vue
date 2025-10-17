<script setup lang="ts">
import { get, includes, isEmpty } from "es-toolkit/compat";

const props = defineProps<{
  player: GamePlayer;
}>();

const { t } = useI18n();
const roleData = computed(() => ({
  don: {
    check: props.player.state.donCheck,
    roles: ["sheriff"],
    src: "/images/roles/sheriff.png",
    success: t("components.Night.Player.Role.data.don.success"),
    unsuccessful: t("components.Night.Player.Role.data.don.unsuccessful"),
  },
  sheriff: {
    check: props.player.state.sheriffCheck,
    roles: ["don", "mafia"],
    src: "/images/roles/don.png",
    success: t("components.Night.Player.Role.data.sheriff.success"),
    unsuccessful: t("components.Night.Player.Role.data.sheriff.unsuccessful"),
  },
}));

const night = useNightStore();
const isCurrent = computed(() => night.current.id === props.player.id);
const currentData = computed(() => get(roleData.value, night.current.role.id));
</script>

<template>
  <div class="flex-1">
    <div class="flex flex-col gap-1 items-center justify-center">
      <template v-if="isCurrent">
        <div class="font-bold mb-2">
          {{ t('components.Night.Player.Role.you') }}
        </div>
        <img class="w-[60px] h-[60px] object-contain" :src="player.role.src">
      </template>
      <template v-else-if="!isEmpty(currentData) && get(currentData, 'check')">
        <template v-if="includes(get(currentData, 'roles'), player.role.id)">
          <div class="font-bold text-success mb-2">
            {{ get(currentData, 'success') }}
          </div>
          <img v-if="player.state.kick" class="w-[60px] h-[60px] object-contain" src="/images/kick.png">
          <img v-else class="w-[60px] h-[60px] object-contain" :src="get(currentData, 'src')">
        </template>
        <template v-else>
          <div class="font-bold text-error mb-2">
            {{ get(currentData, 'unsuccessful') }}
          </div>
          <img v-if="player.state.kick" class="w-[60px] h-[60px] object-contain" src="/images/kick.png">
          <img v-else class="w-[60px] h-[60px] object-contain" src="/images/mafia.png">
        </template>
      </template>
      <template v-else>
        <div class="font-bold mb-2">
          &nbsp;
        </div>
        <img v-if="player.state.kick" class="w-[60px] h-[60px] object-contain" src="/images/kick.png">
        <img v-else-if="player.state.kill" class="w-[60px] h-[60px] object-contain rounded-full" src="/images/dead.svg">
        <img v-else class="w-[60px] h-[60px] object-contain" src="/images/mafia.png">
      </template>
    </div>
  </div>
</template>
