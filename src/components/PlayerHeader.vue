<template>
  <header class="bg-grey-darken-3 header">
    <v-col cols="4" class="text-left d-flex align-center" @click="$router.push('/')">
      <img src="/logo.png" alt="" height="50" width="50" class="mx-2">
      <h1 class="text-xs-h6 text-md-h5 header-title">SmartPrompter</h1>
    </v-col>
    <v-col class="text-center pa-0" cols="4">
          <div v-if="store.config.styles.mode === 'Continuo'">
            <PlayerControlls></PlayerControlls>
          </div>
          <div v-if="store.config.styles.mode === 'Reconocimiento de voz'" class="d-flex justify-center">
            <VoiceControlls></VoiceControlls>
          </div>
          <div v-if="store.config.styles.mode === 'Diapositivas'">
            <PaginationVue></PaginationVue>
          </div>
        </v-col>
    <v-col cols="4" class="text-right">
      <v-btn @click="$router.push('/styler')" variant="plain" icon="mdi-arrow-left"></v-btn>
      <v-btn disabled variant="plain" icon="mdi-arrow-right" density="comfortable" class="ml-2"></v-btn>
    </v-col>
  </header>
</template>

<script setup>
import { useConfigStore } from '@/stores/config';
import { usePlayerStore } from '@/stores/player';
import { onMounted } from 'vue';
import PaginationVue from './Pagination.vue';
import PlayerControlls from './PlayerControlls.vue';
import VoiceControlls from './VoiceControlls.vue';

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