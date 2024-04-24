<script setup>
import { useConfigStore } from '@/stores/config';
import { ref, provide } from 'vue';

const store = useConfigStore()
const mode = ref('Continuo')

const cardsInfo = [
  {
    img: 'velocidad.svg',
    description: 'Control de velocidad'
  },
  {
    img: 'editar.svg',
    description: 'Edición en tiempo real'
  },
  {
    img: 'personalizar.svg',
    description: 'Muy personalizable'
  },
  {
    img: 'microfono.svg',
    description: 'Reconocimiento de voz'
  },
]

const icons = [
  {
    icon: 'mdi-instagram',
    link: ''
  },
  {
    icon: 'mdi-twitter',
    link: ''
  },
  {
    icon: 'mdi-linkedin',
    link: ''
  },
  {
    icon: 'mdi-github',
    link: 'https://github.com/alejandro-zaragoza-02/SmartPrompter'
  },
]

</script>

<template>
  <v-app class="bg-blue-lighten-5" style="overflow-y: auto;">
    <main>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" xs="12" md="5" class="pa-4">
            <div class="d-flex flex-column align-center">
              <v-img src="logo.png" width="200" height="200"></v-img>
              <h1>SmartPrompter</h1>
              <div class="d-flex align-center pa-4">
                <v-btn class="mr-4" @click="$router.push('/editor')">Empezar a usar</v-btn>
                <v-btn @click="$router.push('/help')" variant="plain" density="compact" size="small"
                  icon="mdi-help"></v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" xs="12" md="7" class="pa-4">
            <v-textarea v-model="store.contents[0].data" class="caption" label="Escribe texto..." variant="outlined"
              rows="6" autofocus no-resize hide-details spellcheck="false"></v-textarea>
            <v-btn-toggle v-model="store.config.styles.mode" mandatory color="indigo-lighten-5"
              class="d-flex flex-row flex-wrap mt-4 h-auto">
              <v-btn value="Continuo" class="flex-grow-1 pa-4" :ripple="false">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon icon="mdi-timer-cog-outline" class="mb-2" size="x-large"></v-icon>
                  <p>Continuo</p>
                </div>
              </v-btn>
              <v-btn value="Diapositivas" class="flex-grow-1 pa-4" :ripple="false">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon icon="mdi-play-box-outline" class="mb-2" size="x-large"></v-icon>
                  <p>Diapositivas</p>
                </div>
              </v-btn>
              <v-btn value="Inteligente" class="flex-grow-1 pa-4" :ripple="false">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon icon="mdi-microphone" class="mb-2" size="x-large"></v-icon>
                  <p>Inteligente</p>
                </div>
              </v-btn>
            </v-btn-toggle>
            <p v-show="store.config.styles.mode === 'Inteligente'"
              class="text-orange-accent-3 font-italic warning mt-1">
              <v-icon icon="mdi-alert" size="x-small"></v-icon>
              El modo inteligente usa una API de Google gratuita, por lo que la exactitud del reconocimiento no está
              asegurado.
            </p>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col v-for="card in cardsInfo" cols="12" xs="12" sm="6" md="3">
            <v-card class="d-flex flex-column align-center">
              <v-img class="mt-4" :src="'home/' + card.img" aspect-ratio="1" width="100px"></v-img>
              <v-card-text>
                <p class="text-center">{{ card.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <h2 class="w-100">¿Cómo funciona?</h2>
          <p>SmartPrompter es una aplicación web que te permite configurar un texto para leerlo en formato de
            teleprompter
            a la velocidad que se desee, además te permite configurar elementos visuales y usar reconocimiento de voz.
          </p>
        </v-row>
      </v-container>
    </main>
    <v-footer class="bg-indigo-lighten-1 d-flex justify-space-between">
      <div>
        <strong>Alejandro Zaragoza Elías</strong> - {{ new Date().getFullYear() }}
      </div>
      <div>
        <a v-for="icon in icons" :key="icon.link" class="nostyle" target="_blank" :href="icon.link">
          <v-btn class="mx-4" :icon="icon.icon" variant="text"></v-btn>
        </a>
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped>
main {
  height: 100%;
  overflow-y: auto !important;
}

.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

a.nostyle:link {
  text-decoration: inherit;
  color: inherit;
  cursor: auto;
}

a.nostyle:visited {
  text-decoration: inherit;
  color: inherit;
  cursor: auto;
}

.mode-icon {
  width: 100px;
  aspect-ratio: 1;
}

.warning {
  font-size: .8em;
}
</style>