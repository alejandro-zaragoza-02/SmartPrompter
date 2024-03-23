<script setup>
import { ref } from 'vue';
import { usePlayerStore } from './stores/player';

const player = usePlayerStore()

const fileName = ref('')
const fileExtension = ref('OGG')

</script>

<template>
  <RouterView />
  <v-dialog
      v-model="player.audioFile"
      width="min(90%, 800px)"
    >
      <v-card
        prepend-icon="mdi-progress-download"
        title="Grabación de audio detectada"
      >
      <v-card-text>
        <p class="mb-2">Se ha detectado una grabación de audio. ¿Quieres descargarlo?</p>
        <!-- No me funciona error en el createObjectURL -->
        <v-container>
          <audio v-if="player.audioFile" controls :src="URL.createObjectURL(player.audioFile)"></audio>
        </v-container>
        <v-row dense>
            <v-col
              cols="12"
              sm="9"
            >
              <v-text-field
                label="Nombre del fichero"
                placeholder="audio"
                v-model="fileName"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-select
              label="Extensión"
              :items="['MP3', 'WAV', 'OGG', 'ACC']"
              v-model="fileExtension"
            ></v-select>
            </v-col>
        </v-row>
      </v-card-text> 
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Descargar"
            @click="player.audioFile = null"
          ></v-btn>
          <v-btn
            text="Salir"
            @click="player.audioFile = null"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>