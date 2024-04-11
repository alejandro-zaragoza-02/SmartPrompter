<script setup>
import { useConfigStore } from '@/stores/config';
import { ref, provide } from 'vue';

const store = useConfigStore()

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
                <v-btn @click="$router.push('/help')" variant="plain" density="compact" size="small" icon="mdi-help"></v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" xs="12" md="7" class="pa-4">
            <v-textarea v-model="store.contents[0].data" class="caption" label="Escribe texto..." variant="outlined"
              rows="11" autofocus no-resize hide-details spellcheck="false"></v-textarea>
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
          <p>SmartPrompter es una aplicación web que te permite configurar un texto para leerlo en formato de teleprompter
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

<style>
main {
  height: 100%;
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
</style>