<script setup lang="ts">
const props = withDefaults(defineProps<{
  maxTime?: number;
}>(), {
  maxTime: 60_000,
});

const { t } = useI18n();
const sounds = reactive({
  alarm: useSound("/audio/timer-alarm.mp3"),
});

const stopwatch = useStopwatch(0, false);
const timestamp = computed(() => stopwatch.seconds.value * 1_000 + stopwatch.minutes.value * 60_000);
const isEnd = ref<boolean>(false);

const format = (value: number) => String(value).padStart(2, "0");

const onReset = () => {
  stopwatch.reset();
  isEnd.value = false;
  sounds.alarm.stop();
};

watch(timestamp, () => {
  if (timestamp.value >= props.maxTime) {
    stopwatch.pause();
    sounds.alarm.play();
    isEnd.value = true;
  }
});

onUnmounted(() => {
  sounds.alarm.stop();
});
</script>

<template>
  <div>
    <div :class="[$style.counter, 'text-center text-8xl my-5']">
      <span>{{ format(stopwatch.minutes.value) }}</span>:<span>{{ format(stopwatch.seconds.value) }}</span>
    </div>
    <div class="flex gap-2">
      <template v-if="!isEnd">
        <button v-if="stopwatch.isRunning.value" class="btn btn-primary flex-1" @click="stopwatch.pause()">
          {{ t('components.ui.Stopwatch.pause') }}
        </button>
        <button v-else class="btn btn-primary flex-1" @click="stopwatch.start()">
          {{ t('components.ui.Stopwatch.start') }}
        </button>
      </template>
      <button class="btn btn-outline text-primary flex-1" @click="onReset">
        {{ t('components.ui.Stopwatch.restart') }}
      </button>
    </div>
  </div>
</template>

<style module>
.counter {
  font-family: 'Share Tech Mono', sans-serif;
}
</style>
