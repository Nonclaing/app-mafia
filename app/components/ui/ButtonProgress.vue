<script setup lang="ts">
const props = withDefaults(defineProps<{
  time?: number;
  disabled?: boolean;
}>(), {
  time: 1_000,
});

const disabledTimer = ref<boolean>(true);
const mount = ref<boolean>(false);

onMounted(async () => {
  setTimeout(() => {
    disabledTimer.value = false;
  }, props.time);
  setTimeout(() => {
    mount.value = true;
  }, 0);
});
</script>

<template>
  <button :disabled="disabledTimer || disabled" :class="['btn btn-primary', $style.btnProgress, { [$style.progress]: mount }]" :style="`--time: ${time}ms`">
    <span><slot /></span>
  </button>
</template>

<style lang="css" module>
.btnProgress {
  --time: 0;
  position: relative;
}

.btnProgress span {
  position: relative;
  z-index: 1;
}

.btnProgress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: var(--btn-color);
  transition: width var(--time) linear;
}

.btnProgress.progress::after {
  width: 100%;
}
</style>
