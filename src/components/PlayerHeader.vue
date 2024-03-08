<template>
  <header class="bg-blue-lighten-5">
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col class="text-start" cols="4">
          <div class="d-flex align-center clickable" @click="$router.push('/')">
            <img src="../assets/logo.png" alt="" height="50" width="50" class="mx-2">
            <h1>SmartPrompter</h1>
          </div>
        </v-col>
        <v-col class="text-center" cols="4">
          <div v-if="store.config.styles.mode !== 'Diapositivas'">
            <v-btn @click="$router.push('/styler')" icon="mdi-arrow-left" color="primary" class="mx-2"></v-btn>
            <v-btn v-if="player.play" @click="player.play = false" icon="mdi-pause" color="primary" class="mx-2"></v-btn>
            <v-btn v-if="!player.play" @click="player.play = true" icon="mdi-play" color="primary" class="mx-2"></v-btn>
            <v-btn @click="player.restart()" icon="mdi-restart" color="primary" class="mx-2"></v-btn>
          </div>
          <div v-if="store.config.styles.mode === 'Diapositivas'">
            <PaginationVue></PaginationVue>
          </div>
        </v-col>
        <v-col class="text-end" cols="4">
          <div v-if="store.config.styles.mode !== 'Diapositivas'">
            Tiempo: {{ player.time }} s
          </div>
          <v-btn v-if="store.config.styles.mode === 'Diapositivas'" class="mr-4" color="primary" @click="$router.push('/styler')">Volver</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script setup>
import { useConfigStore } from '@/stores/config';
import { usePlayerStore } from '@/stores/player';
import { onMounted } from 'vue';
import PaginationVue from './Pagination.vue';

const player = usePlayerStore()
const store = useConfigStore()

onMounted(() => {
  clearInterval(player.timeIntervalId)
  player.timeIntervalId = setInterval(() => {
    if (player.play) {
      player.time = player.time + 1
    }
  }, 1000)
})

</script>