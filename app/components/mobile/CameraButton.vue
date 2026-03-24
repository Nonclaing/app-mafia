<script setup lang="ts">
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

const photoUrl = ref<string | null>(null);

const takePhoto = async () => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const image = await Camera.getPhoto({
      quality: 90, // качество 0-100
      allowEditing: false, // можно true, если хочешь дать пользователю обрезать
      resultType: CameraResultType.Uri, // Uri — самый удобный для <img>
      source: CameraSource.Camera, // ← ЭТО КЛЮЧЕВОЕ! Открывает именно камеру, а не галерею
      saveToGallery: false, // не сохранять автоматически
      width: 1200, // можно задать размер
      height: 1200,
      correctOrientation: true,
    });

    photoUrl.value = image.webPath!;
    console.log("Снимок получен!", image);
  }
  catch (error) {
    console.error("Камера не открылась:", error);
  }
};
</script>

<template>
  <div v-show="Capacitor.isNativePlatform()">
    <button class="btn" @click="takePhoto">Открыть камеру</button>
    <img v-if="photoUrl" :src="photoUrl" class="max-w-full">
  </div>
</template>
