<script setup lang="ts">
import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

const sendTestNotification = async () => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    // Запрашиваем разрешение (обязательно на Android 13+ / 15+)
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") return;

    // Планируем уведомление ровно через 2 секунды
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 999999) + 1, // уникальный ID
          title: "Конструктор",
          body: "Это тестовое уведомление пришло через 2 секунды!",
          schedule: {
            at: new Date(Date.now() + 3000),
            allowWhileIdle: true, // важно для Android 15+ (чтобы сработало даже в Doze)
          }, // ← 2 секунды
          sound: undefined, // можно добавить свой звук позже
        },
      ],
    });

    console.log("Уведомление запланировано через 2 секунды");
    // alert('Уведомление будет через 2 секунды!') // можно раскомментировать
  }
  catch (error) {
    console.error("Ошибка уведомления:", error);
  }
};
</script>

<template>
  <div>
    <button class="btn bg-green-500 text-white" @click="sendTestNotification">
      🔔 Отправить тестовое уведомление (через 2 сек)
    </button>
  </div>
</template>

<style scoped>
</style>
