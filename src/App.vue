<script setup>
import { ref } from 'vue';
import { usePlayerStore } from './stores/player';
import { watch } from 'vue';

const player = usePlayerStore()
const modal = ref(player.audioFile.length > 0)
const loadingAudio = ref(true)
const loadingTimeout = ref(0)

const fileName = ref('')
const fileExtension = ref('OGG')

watch(player, (newAudioFile) => {
  console.log(newAudioFile.audioFile)
  modal.value = newAudioFile.audioFile.length > 0 && newAudioFile.audioFile[0]?.size > 25000
})

watch(modal, (newModal) => {
  loadingAudio.value = true
})

const getSrc = () => {
  return (player.audioFile && URL) ? URL.createObjectURL(new Blob(player.audioFile)) : ''
}

const downloadAudio = () => {
  const blob = new Blob(player.audioFile, { type: `audio/${fileExtension.value.toLowerCase()}` })
  const audioURL = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = audioURL
  link.download = `${fileName.value || 'audio'}.${fileExtension.value.toLowerCase()}`
  link.click()
  player.audioFile = []
}

const loadAudio = () => {
  clearTimeout(loadingTimeout.value)
  loadingTimeout.value = setTimeout(() => {
    loadingAudio.value = false
  }, 1000)
}

</script>

<template>
  <RouterView />
  <v-dialog v-model="modal" width="min(90%, 800px)">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Grabación de audio detectada</v-toolbar-title>
        <v-btn icon="mdi-close" @click="player.audioFile = []"></v-btn>
      </v-toolbar>
      <v-card-text>
        <p>Se ha detectado una grabación de audio. ¿Quieres descargarlo?</p>
        <v-container >
          <div v-show="player.audioFile.length > 0 && !loadingAudio" class="audioInput">
            <audio class="w-100 h-100" controls :src="getSrc()" controlslist="nodownload" :oncanplaythrough="loadAudio"></audio>
          </div>
          <div v-if="loadingAudio" class="audioInput d-flex align-center">
            <v-progress-linear indeterminate></v-progress-linear>
          </div>
        </v-container>
        <v-row dense>
          <v-col cols="12" sm="9">
            <v-text-field label="Nombre del fichero" placeholder="audio" v-model="fileName"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select label="Extensión" :items="['WAV', 'OGG', 'MPEG']" v-model="fileExtension"></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Descargar" block @click="downloadAudio()" variant="elevated"</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>

.audioInput{
  height: 4em;
  margin-bottom: .5em
}

</style>