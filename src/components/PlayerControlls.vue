<template>
    <v-btn v-if="player.play" @click="player.play = false" icon="mdi-pause" color="primary" class="mr-2"></v-btn>
    <v-btn v-if="!player.play" @click="player.play = true" icon="mdi-play" color="primary" class="mr-2"></v-btn>
    <v-btn @click="player.restart()" icon="mdi-restart" color="primary" class="mx-2" density="comfortable"></v-btn>
</template>

<script setup>

import { usePlayerStore } from '@/stores/player';
import { onMounted, onUnmounted } from 'vue';

const player = usePlayerStore()

const handleKeydown = (event) => {
  const keyName = event.code;
  console.log(keyName)
  switch (keyName) {
    case 'Enter':
    case 'Space':
      player.play = !player.play
      break;
    case 'Backspace':
    case 'Escape':
      player.restart()
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