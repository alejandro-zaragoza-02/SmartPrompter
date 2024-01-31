<template>
  <header class="bg-blue-lighten-5">
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col class="text-start" cols="4">
          <h1>SmartPrompter</h1>
        </v-col>
        <v-col class="text-center" cols="4">
          <div>
            <v-btn v-if="player.play" @click="player.play = false" icon="mdi-pause" color="primary" class="mx-2"></v-btn>
            <v-btn v-if="!player.play" @click="player.play = true" icon="mdi-play" color="primary" class="mx-2"></v-btn>
            <v-btn @click="restart()" icon="mdi-restart" color="primary" class="mx-2"></v-btn>
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

const player = usePlayerStore()

let counter;

clearInterval(counter)

counter = setInterval(() => {
  if(player.play){
    player.time = player.time + 1
  }
}, 1000)

let restart = () => {
  player.play = false
  player.time = 0
}

</script>