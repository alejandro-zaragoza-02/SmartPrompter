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
    description: 'Disponible con control de voz'
  },
]

</script>

<template>
  <main class="bg-blue-lighten-5">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" xs="12" sm="5" class="pa-4">
          <div class="d-flex flex-column align-center">
            <v-img src="/src/assets/home/logo.png" width="200" height="200"></v-img>
            <v-btn class="mt-4" @click="$router.push('/editor')">Empezar a usar</v-btn>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="7" class="pa-4">
          <v-textarea v-model="store.contents[0].data" class="caption" label="Escribe texto..." variant="outlined" rows="9" autofocus auto-grow></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row no-gutters>
        <v-col v-for="card in cardsInfo" cols="12" xs="12" sm="3" md="3">
          <v-card class="ma-8 d-flex flex-column align-center">
            <v-img class="mt-4" :src="'src/assets/home/' + card.img" aspect-ratio="1" width="50%"></v-img>
            <v-card-text>
              <p class="text-center">{{ card.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="4">
          <h2>¿Cómo funciona?</h2>
        </v-col>
        <v-col cols="8">
          <p>SmartPrompter es una aplicación web que te permite configurar un texto para leerlo en formato de teleprompter a la velocidad que se desee, además te permite configurar elementos visuales y usar reconocimiento de voz. </p>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>