<script setup>
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'
import languages from '../helpers/getLanguages.js'

const store = useConfigStore()

const colorFillDialog = ref(false)
const colorTextDialog = ref(false)

const audioConfigForm = ref(null);

const voiceConfigDialog = ref(false)
const audioDevices = ref([])

navigator.mediaDevices.enumerateDevices()
  .then(function (devices) {
    devices.forEach(function (device) {
      if (device.kind === 'audioinput') {
        audioDevices.value.push(device.label)
        if (device.deviceId === 'default') {
          store.config.voice.micro = device.label
        }
      }
    });
  })
  .catch(function (err) {
    console.log(err.name + ": " + err.message)
  });

const auxMargin = ref(store.config.styles.margin)

const symmetrize = () => {
  if (auxMargin.value[0] !== store.config.styles.margin[0] && (auxMargin.value[1] === store.config.styles.margin[1] || auxMargin.value[0] === store.config.styles.margin[1])) {
    store.config.styles.margin[1] = 100 - store.config.styles.margin[0];
  }
  if ((auxMargin.value[0] === store.config.styles.margin[0] || auxMargin.value[1] === store.config.styles.margin[0]) && auxMargin.value[1] !== store.config.styles.margin[1]) {
    store.config.styles.margin[0] = 100 - store.config.styles.margin[1];
  }
  auxMargin.value = store.config.styles.margin;
}

const checkAudioConfigErrors = async () => {
  const validation = await audioConfigForm.value.validate();
  if (validation.valid) {
    voiceConfigDialog.value = false
  }
}

</script>

<template>
  <header class="bg-grey-darken-3 pa-3 header">
    <div class="d-flex justify-space-between w-100">
      <div class="d-flex align-center clickable" @click="$router.push('/')">
        <img src="../assets/logo.png" alt="" height="50" width="50" class="mx-2">
        <h1>SmartPrompter</h1>
      </div>
      <div>
        <v-btn class="mr-4" color="blue-lighten-5" @click="$router.push('/editor')">Volver</v-btn>
        <v-btn color="primary" @click="$router.push((store.config.styles.mode !== 'Diapositivas') ? '/player' : '/slider')">Iniciar</v-btn>
      </div>
    </div>
    <div class="options">
      <v-select v-if="store.config.styles.mode === 'Continuo'" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]" v-model="store.config.styles.speed"
        prepend-inner-icon="mdi-speedometer" hide-details density="compact" class="speed" variant="solo"></v-select>
      <v-select v-if="store.config.styles.mode === 'Reconocimiento de voz'" :items="[0.2, 0.3, 0.4]" v-model="store.config.voice.recognitionThreshold"
        prepend-inner-icon="mdi-unfold-more-vertical" hide-details density="compact" class="speed" variant="solo"></v-select>
      <v-select :items="[8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96]" v-model="store.config.styles.fontSize"
        prepend-inner-icon="mdi-format-font-size-increase" hide-details density="compact" class="textSize"
        variant="solo"></v-select>
      <v-select
        :items="['Roboto', 'Arial', 'Courier New', 'Calibri', 'Verdana', 'Georgia', 'Gill Sans', 'Segoe UI', 'Tahoma', 'Geneva', 'Cambria', 'Cochin', 'Impact']"
        v-model="store.config.styles.fontFamily" prepend-inner-icon="mdi-format-size" hide-details density="compact"
        class="fontFamily" variant="solo"></v-select>
      <div>
        <v-icon icon="mdi-format-color-fill" class="mr-1"></v-icon>
        <v-btn @click="colorFillDialog = true" :color="store.config.styles.backgroundColor">
          <v-dialog v-model="colorFillDialog" width="auto">
            <v-card>
              <v-card-text>
                <v-color-picker v-model="store.config.styles.backgroundColor" hide-inputs></v-color-picker>
              </v-card-text>
              <v-card-actions>
                <v-btn block @click="colorFillDialog = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
      <div>
        <v-icon icon="mdi-format-color-text" class="mr-1"></v-icon>
        <v-btn @click="colorTextDialog = true;" :color="store.config.styles.textColor">
          <v-dialog v-model="colorTextDialog" width="auto">
            <v-card>
              <v-card-text>
                <v-color-picker v-model="store.config.styles.textColor" hide-inputs></v-color-picker>
              </v-card-text>
              <v-card-actions>
                <v-btn block @click="colorTextDialog = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
      <v-select v-model="store.config.styles.lineSpacing" :items="[0.5, 1.0, 1.5, 2.0, 2.5, 3.0]"
        prepend-inner-icon="mdi-format-font-size-increase" hide-details density="compact" class="lineSpacing"
        variant="solo"></v-select>
      <div>
        <v-btn-toggle v-model="store.config.styles.textJustify" shaped mandatory rounded="">
          <v-btn size="small" icon="mdi-format-align-left"></v-btn>
          <v-btn size="small" icon="mdi-format-align-center"></v-btn>
          <v-btn size="small" icon="mdi-format-align-right"></v-btn>
          <v-btn size="small" icon="mdi-format-align-justify"></v-btn>
        </v-btn-toggle>
      </div>
      <label :class="store.config.styles.mirrorX ? 'selected' : ''" class="rounded-circle">
        <v-icon icon="mdi-flip-horizontal"></v-icon>
        <input type="checkbox" v-model="store.config.styles.mirrorX" style="display: none;">
      </label>
      <label :class="store.config.styles.mirrorY ? 'selected' : ''" class="rounded-circle">
        <v-icon icon="mdi-flip-vertical"></v-icon>
        <input type="checkbox" v-model="store.config.styles.mirrorY" style="display: none;">
      </label>
      <v-icon v-if="store.config.styles.mode === 'Reconocimiento de voz'" icon="mdi-microphone" @click="voiceConfigDialog = true"></v-icon>
      <v-dialog v-if="store.config.styles.mode === 'Reconocimiento de voz'" v-model="voiceConfigDialog" width="70%" persistent>
        <v-form @submit.prevent="checkAudioConfigErrors()" ref="audioConfigForm" validate-on="input">
          <v-card>
            <v-card-title class="text-center mt-4 mb-3">
              <span class="text-h5">Configuración de audio</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-select label="Micrófono" variant="outlined" :items="audioDevices"
                v-model="store.config.voice.micro"></v-select>
              <v-autocomplete label="Idioma" variant="outlined" :items="languages" item-title="title" item-value="code"
                v-model="store.config.voice.lang" :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Debe seleccionar un idioma',
                ]"></v-autocomplete>
              <v-switch label="Grabar audio" color="primary" hide-details density="compact"
                v-model="store.config.voice.recordVoice"></v-switch>
              <v-row class="flex-wrap">
                <v-col cols="auto">
                  <v-switch label="Sincronización de voz" color="primary" hide-details density="compact"
                    v-model="store.config.voice.voiceSync"></v-switch>
                </v-col>
                <v-col v-if="store.config.voice.voiceSync" cols="auto" style="width: 10em;">
                  <v-text-field label="Umbral de error (0 - 1)" v-model="store.config.voice.recognitionThreshold"
                    hide-details density="compact" variant="underlined"></v-text-field>
                </v-col>
              </v-row>
              <div class="text-h6 my-4">Comandos de voz</div>
              <v-row class="align-center px-4 pt-1">
                <label class="w-25">Reproducir:</label>
                <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                  v-model="store.config.voice.voiceCommands.play"></v-combobox>
              </v-row>
              <v-row class="align-center px-4 pt-1">
                <label class="w-25">Pausar:</label>
                <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                  v-model="store.config.voice.voiceCommands.pause"></v-combobox>
              </v-row>
              <v-row class="align-center px-4 pt-1">
                <label class="w-25">Reiniciar:</label>
                <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                  v-model="store.config.voice.voiceCommands.restart"></v-combobox>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-8">
              <v-btn color="primary" block type="submit" variant="outlined">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
    <div>
      <v-range-slider v-model="store.config.styles.margin" @end="symmetrize()" min="0" max="100" step="1" color="primary" hide-details></v-range-slider>
    </div>
  </header>
</template>

<style>

.speed {
  width: 7em;
}

.textSize {
  width: 7em;
}

.fontFamily {
  width: 11em;
}

.lineSpacing {
  width: 7em;
}

.header {
  display: flex;
  flex-direction: column;
}

.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.selected {
  color: rgb(129, 173, 240);
}

</style>