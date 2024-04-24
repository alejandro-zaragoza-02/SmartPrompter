<template>
  <v-bottom-sheet v-model="speedConfig">
    <v-card>
      <v-container>
        <v-card-title>
          Configuración de velocidad
          <v-chip class="float-right">{{ store.config.styles.speed }}</v-chip>
        </v-card-title>
        <v-card-text>
          <v-slider v-model="store.config.styles.speed" min="1" max="99" step="1" hide-details></v-slider>
        </v-card-text>
      </v-container>
    </v-card>
  </v-bottom-sheet>
  <div class="d-flex justify-center align-center ga-2">
    <v-btn @click="speedConfig = true" :disabled="player.play" icon="mdi-cog" density="comfortable"
      color="primary"></v-btn>
    <v-btn v-if="player.play" @click="player.play = false" icon="mdi-pause" color="primary"></v-btn>
    <v-btn v-if="!player.play" @click="player.play = true" icon="mdi-play" color="primary"></v-btn>
    <v-btn @click="player.restart(); player.reset = true" icon="mdi-restart" color="primary"
      density="comfortable"></v-btn>
  </div>
</template>

<script setup>

import { useConfigStore } from '@/stores/config';
import { usePlayerStore } from '@/stores/player';
import { onMounted, onUnmounted, ref } from 'vue';

const player = usePlayerStore()
const store = useConfigStore()
const speedConfig = ref(false)

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