<script setup>
console.log("init");
const networkStore = useNetworkStore();

// Функция для ручного обновления статуса (проверка "пинг")
const refreshStatus = async () => {
  await networkStore.reload();
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="!networkStore.isOnline"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-white p-6 text-center"
    >
      <div class="offline-screen__content max-w-sm">
        <div class="offline-screen__icon mb-6 flex justify-center">
          <div class="rounded-full bg-red-50 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="Status-Offline-Icon-Path-Here" />
              <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.58 9M1.42 9a15.91 15.91 0 014.7-2.88" />
            </svg>
          </div>
        </div>

        <h2 class="offline-screen__title mb-2 text-2xl font-bold text-slate-900">
          Связь потеряна
        </h2>

        <p class="offline-screen__description mb-8 text-slate-500">
          Похоже, интернет пропал. Проверьте настройки Wi-Fi или мобильной сети.
          Ваш прогресс в конструкторе сохранен локально.
        </p>

        <button
          class="offline-screen__button w-full rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-transform active:scale-95"
          @click="refreshStatus"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  </Transition>
</template>
