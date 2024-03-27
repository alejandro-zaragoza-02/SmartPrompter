<script setup>
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'
import languages from '../helpers/getLanguages.js'
import ExportSelector from '@/components/ExportSelector.vue'

const donwloadModal = ref(false)


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

const importFile = (evt) => {
  let input = evt.target
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      const json = JSON.parse(e.target.result)
      store.contents = json.contents
      store.config = json.config
      input.value = ''
    }
    reader.readAsText(input.files[0]);
  }
}

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
  <header class="bg-grey-darken-3 header">
    <v-col cols="4" class="text-left d-flex align-center clickable" @click="$router.push('/')">
      <img src="../assets/logo.png" alt="" height="50" width="50" class="mx-2">
      <h1 class="text-xs-h6 text-md-h5 header-title">SmartPrompter</h1>
    </v-col>
    <v-col cols="4" class="text-center">
      <p class="text-sm-h6 text-md-h5">EDITOR VISUAL</p>
    </v-col>
    <v-col cols="4" class="text-right">
      <v-btn @click="$router.push('/editor')" variant="plain" icon="mdi-arrow-left"></v-btn>
      <v-btn @click="$router.push('/player')" variant="plain" icon="mdi-arrow-right" density="comfortable"
        class="ml-2"></v-btn>
    </v-col>
  </header>
  <v-divider :thickness="1"></v-divider>
  <div class="bg-grey-darken-1">
    <v-container>
      <v-row>
          <!-- <v-select v-if="store.config.styles.mode === 'Continuo'" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]" v-model="store.config.styles.speed"
            prepend-inner-icon="mdi-speedometer" hide-details density="compact" class="speed" variant="solo"></v-select>
          <v-select v-if="store.config.styles.mode === 'Reconocimiento de voz'" :items="[0.2, 0.3, 0.4]" v-model="store.config.voice.recognitionThreshold"
            prepend-inner-icon="mdi-unfold-more-vertical" hide-details density="compact" class="speed" variant="solo"></v-select> -->
          <v-col class="center">
              <v-select :items="[8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96]"
                v-model="store.config.styles.fontSize" prepend-inner-icon="mdi-format-font-size-increase" hide-details
                density="compact" class="textSize" variant="solo"></v-select>
          </v-col>
          <v-col class="center">
            <v-select
                :items="['Roboto', 'Arial', 'Courier New', 'Calibri', 'Verdana', 'Georgia', 'Gill Sans', 'Segoe UI', 'Tahoma', 'Geneva', 'Cambria', 'Cochin', 'Impact']"
                v-model="store.config.styles.fontFamily" prepend-inner-icon="mdi-format-size" hide-details density="compact"
                class="fontFamily ml-2" variant="solo"></v-select>
          </v-col>
    
          <v-col class="center">
            <div class="colorPicker">
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
            <div class="colorPicker">
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
          </v-col>
          <v-col class="center">
            <v-select v-model="store.config.styles.lineSpacing" :items="[0.5, 1.0, 1.5, 2.0, 2.5, 3.0]"
              prepend-inner-icon="mdi-format-font-size-increase" hide-details density="compact" class="lineSpacing"
              variant="solo"></v-select>
          </v-col>
          <v-col class="center">
            <v-btn-toggle v-model="store.config.styles.textJustify" mandatory>
              <v-btn size="small" icon="mdi-format-align-left"></v-btn>
              <v-btn size="small" icon="mdi-format-align-center"></v-btn>
              <v-btn size="small" icon="mdi-format-align-right"></v-btn>
              <v-btn size="small" icon="mdi-format-align-justify"></v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col class="center icons">
            <label :class="store.config.styles.mirrorX ? 'selected' : ''">
              <v-icon icon="mdi-flip-horizontal"></v-icon>
              <input type="checkbox" v-model="store.config.styles.mirrorX" style="display: none;">
            </label>
            <label :class="store.config.styles.mirrorY ? 'selected' : ''">
              <v-icon icon="mdi-flip-vertical"></v-icon>
              <input type="checkbox" v-model="store.config.styles.mirrorY" style="display: none;">
            </label>
            <v-icon v-if="store.config.styles.mode === 'Reconocimiento de voz'" icon="mdi-microphone"
              @click="voiceConfigDialog = true"></v-icon>
            <v-icon icon="mdi-download" @click="donwloadModal = true"></v-icon>
            <ExportSelector v-model="donwloadModal"></ExportSelector>
            <label class="clickable">
              <v-icon icon="mdi-file-upload-outline"></v-icon>
              <input v-show="false" type="file" @change="importFile($event)">
            </label>
            <v-dialog v-if="store.config.styles.mode === 'Reconocimiento de voz'" v-model="voiceConfigDialog"
              width="min(90%, 800px)" persistent>
              <v-form @submit.prevent="checkAudioConfigErrors()" ref="audioConfigForm" validate-on="input">
                <v-card>
                  <v-card-title class="text-center mt-4 mb-3">
                    <span class="text-h5">Configuración de audio</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-select label="Micrófono" variant="outlined" :items="audioDevices"
                      v-model="store.config.voice.micro"></v-select>
                    <v-autocomplete label="Idioma" variant="outlined" :items="languages" item-title="title"
                      item-value="code" v-model="store.config.voice.lang" :rules="[
            (val) =>
              (val && val.length > 0) || 'Debe seleccionar un idioma',
          ]"></v-autocomplete>
                    <v-switch label="Grabar audio" color="primary" hide-details density="compact"
                      v-model="store.config.voice.recordVoice"></v-switch>
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
          </v-col>
        </v-row>
    </v-container>
    <div>
        <v-range-slider v-model="store.config.styles.margin" @end="symmetrize()" min="0" max="100" step="1" hide-details></v-range-slider>
    </div>
  </div>
</template>

<style scoped>

.selected {
  color: rgb(129, 173, 240);
}

.fontFamily{
  min-width: 10em;
}

.textSize{
  min-width: 8em;
}

.colorPicker{
  min-width: 7em;
}

.lineSpacing{
  min-width: 8em;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .2em .4em;
}

.icons{
  gap: .7em;
}

</style>