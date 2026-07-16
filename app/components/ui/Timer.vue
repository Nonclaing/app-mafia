<script setup lang="ts">
const sounds = reactive({
  countdown: useSound(useAssetUrl("/audio/countdown.mp3")),
});

const props = withDefaults(defineProps<{
  time?: number;
  control?: boolean;
  withSound?: boolean;
}>(), {
  time: 60_000,
  control: false,
  withSound: false,
});

const end = defineModel<boolean>("end", { default: false });
const model = defineModel<number>({ default: 0 });

const countdown = computed(() => Math.round(props.time / 1000));
const { remaining, start } = useCountdown(countdown, {
  onComplete() {
    end.value = true;
  },
  onTick() {
    if (remaining.value <= (sounds.countdown.duration || 13) / 1000 && !sounds.countdown.isPlaying) sounds.countdown.play();
    model.value = remaining.value;
  },
});

onMounted(() => {
  start();
});
</script>

<template>
  <span :class="[$style.root, 'countdown font-mono text-8xl']">
    <span :style="`--value: ${remaining};`" aria-live="polite" :aria-label="remaining">{{ remaining }}</span>
  </span>
</template>

<style module>
.root {
  font-family: 'Share Tech Mono', sans-serif;
}
</style>
