<template>
  <header class="bg-blue-lighten-5">
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col class="text-start" cols="4">
          <h1>SmartPrompter</h1>
        </v-col>
        <v-col class="text-center" cols="4">
          <div>
            <v-btn @click="$router.push('/styler')" icon="mdi-arrow-left" color="primary" class="mx-2"></v-btn>
            <v-btn v-if="player.play" @click="player.play = false" icon="mdi-pause" color="primary" class="mx-2"></v-btn>
            <v-btn v-if="!player.play" @click="player.play = true" icon="mdi-play" color="primary" class="mx-2"></v-btn>
            <v-btn @click="player.restart()" icon="mdi-restart" color="primary" class="mx-2"></v-btn>
          </div>
        </v-col>
        <v-col class="text-end" cols="4">
          <div>
            Tiempo: {{ player.time }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player';
import { onMounted } from 'vue';

const player = usePlayerStore()

onMounted(() => {
  clearInterval(player.timeIntervalId)
  player.timeIntervalId = setInterval(() => {
    if(player.play){
      player.time = player.time + 1
    }
  }, 1000)
})

</script>