<template>
  <div class="d-flex justify-center align-center">
    <v-btn @click="player.slide -= 1" :disabled="player.slide < 1" icon="mdi-chevron-left" color="primary"
      class="mx-2"></v-btn>
    <p class="px-2" style="font-size: 1.5em;">{{ player.slide + 1 }}</p>
    <v-btn @click="player.slide += 1" :disabled="player.slide >= store.contents.length - 1" icon="mdi-chevron-right"
      color="primary" class="mx-2"></v-btn>
  </div>
</template>

<script setup>

import { useConfigStore } from '@/stores/config'
import { usePlayerStore } from '@/stores/player';
import { onMounted, onUnmounted } from 'vue';

const store = useConfigStore()
const player = usePlayerStore()

const handleKeydown = (event) => {
  const keyName = event.key;
  console.log(keyName)
  switch (keyName) {
    case 'ArrowLeft':
      if (player.slide >= 1) {
        player.slide--
      }
      break;
    case 'ArrowRight':
      if (player.slide < store.contents.length - 1) {
        player.slide++
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