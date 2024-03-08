<template>
  <div class="d-flex justify-center align-center">
    <v-btn @click="store.config.styles.slide -= 1" :disabled="store.config.styles.slide < 1" icon="mdi-chevron-left"
      color="primary" class="mx-2"></v-btn>
    <p class="px-2" style="font-size: 1.5em;">{{ store.config.styles.slide + 1 }}</p>
    <v-btn @click="store.config.styles.slide += 1" :disabled="store.config.styles.slide >= store.contents.length - 1"
      icon="mdi-chevron-right" color="primary" class="mx-2"></v-btn>
  </div>
</template>

<script setup>

import { useConfigStore } from '@/stores/config'
import { onMounted, onUnmounted } from 'vue';

const store = useConfigStore()

const handleKeydown = (event) => {
  const keyName = event.key;
  console.log(keyName)
  switch (keyName) {
    case 'ArrowLeft':
      if (store.config.styles.slide >= 1) {
        store.config.styles.slide--
      }
      break;
    case 'ArrowRight':
      if (store.config.styles.slide < store.contents.length - 1) {
        store.config.styles.slide++
      }
      break;
    default:
      break;
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

</script>