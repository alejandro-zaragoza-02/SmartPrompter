<script setup>
import { ref } from 'vue';
import languages from '../helpers/getLanguages.js'
import { useConfigStore } from '@/stores/config';
import ExportSelector from '@/components/ExportSelector.vue'

const store = useConfigStore()

const dialog = ref(false)
const mode = ref(store.config.styles.mode)
const speed = ref(store.config.styles.speed)
const error = ref(store.config.voice.recognitionThreshold)
const window = ref(store.config.voice.wordWindow)
const micro = ref(store.config.voice.micro)
const lang = ref(store.config.voice.lang)
const audio = ref(store.config.voice.recordVoice)
const commands = ref(store.config.voice.voiceCommands)
const snackbar = ref({
  value: false,
  text: '',
  color: '',
  icon: ''
})

const audioDevices = ref([])

navigator.mediaDevices.enumerateDevices()
  .then(function (devices) {
    devices.forEach(function (device) {
      if (device.kind === 'audioinput') {
        audioDevices.value.push({
          label: device.label,
          value: device.deviceId
        })
      }
    });
  })
  .catch(function (err) {
    console.log(err)
  });

const importFile = (evt) => {
  let input = evt.target
  var reader = new FileReader();
  reader.onload = function (e) {
    try {
      switch (input.files[0].type) {
        case 'application/json':
          const json = JSON.parse(e.target.result)
          if (json.contents) {
            store.contents = json.contents
          }
          if (json.config) {
            store.config = json.config
          }
          break
        case '':
          if (input.files[0].name.endsWith('.md')) {
            console.log(e.target.result)
            let contents = []
            let config = {}
            let data = e.target.result.split('---')
            data = data.slice(0, data.length - 1)
            data.forEach(content => {
              if (!content) return
              console.log(content)
              if (content.substr(0, 12).includes('Config:')) {
                const settings = content.split('\n').filter((line) => line && line !== 'Config:')
                settings.forEach(setting => {
                  const directive = setting.split(':')[0]
                  const value = setting.split(':')[1].replace(' ', '')
                  switch (directive.toLowerCase()) {
                    case 'mode':
                      if (value === 'Continuo' || value === 'Dispositivas' || value === 'Inteligente') {
                        store.config.styles.mode = value
                      }
                      break;
                    case 'speed':
                      if (Number(value) > 0 && Number(value) < 100) {
                        store.config.styles.speed = Number(value)
                      }
                      break;
                    case 'backgroundcolor':
                      const regexBG = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
                      if (value.match(regexBG)) {
                        store.config.styles.backgroundColor = value
                      }
                      break;
                    case 'textcolor':
                      const regexTC = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
                      if (value.match(regexTC)) {
                        store.config.styles.textColor = value
                      }
                      break;
                    case 'fontfamily':
                      if (['arimo', 'quicksand', 'kanit', 'merriweather', 'nunito', 'oswald', 'monserrat', 'opensans', 'roboto'].includes(value.toLowerCase())) {
                        store.config.styles.fontFamily = value
                      }
                      break;
                    case 'fontsize':
                      if (Number(value) > 0 && Number(value) < 150) {
                        store.config.styles.fontSize = Number(value)
                      }
                      break;
                    case 'linespacing':
                      if (Number(value) > 0 && Number(value) < 10) {
                        store.config.styles.lineSpacing = Number(value)
                      }
                      break;
                    case 'margin':
                      const valuesM = value.replace(' ', '').split(',')
                      if (valuesM.length === 2 && Number(valuesM[0]) > 0 && Number(valuesM[0]) < Number(valuesM[1]) && Number(valuesM[1]) < 100) {
                        store.config.styles.margin = [Number(valuesM[0]), Number(valuesM[1])]
                      }
                      break;
                    case 'mirror(x)':
                      if (['true', 'false'].includes(value)) {
                        store.config.styles.mirrorX = (value === 'true') ? true : false
                      }
                      break;
                    case 'mirror(y)':
                      if (['true', 'false'].includes(value)) {
                        store.config.styles.mirrorY = (value === 'true') ? true : false
                      }
                      break;
                    case 'textjustify':
                      if ([0, 1, 2, 3].includes(Number(value))) {
                        store.config.styles.textJustify = Number(value)
                      }
                      break;
                    case 'recognitionthreshold':
                      if (Number(value) > 0 && Number(value) <= 0.5) {
                        store.config.voice.recognitionThreshold = Number(value)
                      }
                      break;
                    case 'voicerecorder':
                      if (['true', 'false'].includes(value)) {
                        store.config.voice.recordVoice = (value === 'true') ? true : false
                      }
                      break;
                    case 'wordwindow':
                      if (Number(value) > 0 && Number(value) <= 9) {
                        store.config.voice.wordWindow = Number(value)
                      }
                      break;
                    case 'voicecommandscontinuousplay':
                      const valuesVCPlay = value.replace(' ', '').split(',')
                      if (valuesVCPlay[0] && valuesVCPlay[1]) {
                        store.config.voice.voiceCommands.Continuo.play = [valuesVCPlay[0], valuesVCPlay[1]]
                      }
                      break;
                    case 'voicecommandscontinuouspause':
                      const valuesVCPause = value.replace(' ', '').split(',')
                      if (valuesVCPause[0] && valuesVCPause[1]) {
                        store.config.voice.voiceCommands.Continuo.pause = [valuesVCPause[0], valuesVCPause[1]]
                      }
                      break;
                    case 'voicecommandscontinuousrestart':
                      const valuesVCRestart = value.replace(' ', '').split(',')
                      if (valuesVCRestart[0] && valuesVCRestart[1]) {
                        store.config.voice.voiceCommands.Continuo.restart = [valuesVCRestart[0], valuesVCRestart[1]]
                      }
                      break;
                    case 'voicecommandsslidernext':
                      const valuesVCNext = value.replace(' ', '').split(',')
                      if (valuesVCNext[0] && valuesVCNext[1]) {
                        store.config.voice.voiceCommands.Dispositivas.next = [valuesVCNext[0], valuesVCNext[1]]
                      }
                      break;
                    case 'voicecommandssliderback':
                      const valuesVCBack = value.replace(' ', '').split(',')
                      if (valuesVCBack[0] && valuesVCBack[1]) {
                        store.config.voice.voiceCommands.Dispositivas.back = [valuesVCBack[0], valuesVCBack[1]]
                      }
                      break;
                    default:
                      break;
                  }
                })
              } else {
                if (content.includes('![Imagen]')) {
                  contents.push({
                    type: 'image',
                    data: content.slice(11, content.length - 2),
                    config: {
                      width: 10
                    }
                  })
                } else {
                  contents.push({
                    type: 'text',
                    data: content
                  })
                }
              }

            })
            store.contents = contents
          } else {
            throw new Error('El fichero no es válido.')
          }
          break
        default:
          throw new Error('El fichero no es válido.')
      }
      input.value = ''
      snackbar.value.value = true
      snackbar.value.text = 'Fichero importado correctamente'
      snackbar.value.color = 'green'
      snackbar.value.icon = 'mdi-check-circle-outline'
    } catch (error) {
      console.log(error)
      snackbar.value.value = true
      snackbar.value.text = 'Error. No se pudo importar el fichero.'
      snackbar.value.color = 'red'
      snackbar.value.icon = 'mdi-alert'
    }
  }
  reader.readAsText(input.files[0]);
}

const saveConfig = () => {
  store.config.styles.mode = mode
  store.config.styles.speed = speed
  store.config.voice.recognitionThreshold = error
  store.config.voice.wordWindow = window
  store.config.voice.micro = micro
  store.config.voice.lang = lang
  store.config.voice.recordVoice = audio
  store.config.voice.voiceCommands = commands
  dialog.value = false
}

</script>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-icon icon="mdi-cog" v-bind="activatorProps"></v-icon>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
          <v-toolbar-title>Congifuración</v-toolbar-title>
          <v-toolbar-items>
            <v-btn text="Guardar" variant="text" @click="saveConfig()"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list class="overflow-x-hidden">
          <v-list-subheader>General</v-list-subheader>
          <v-list-item title="Modo de reproducción">
            <v-btn-toggle v-model="mode" mandatory tile color="primary"
              class="d-flex flex-column flex-sm-row h-100 mb-2">
              <v-btn value="Continuo" prepend-icon="mdi-timer-cog-outline" class="flex-grow-1 py-3"
                :ripple="false">Continuo</v-btn>
              <v-btn value="Diapositivas" prepend-icon="mdi-play-box-outline" class="flex-grow-1 py-3"
                :ripple="false">Diapositivas</v-btn>
              <v-btn value="Inteligente" prepend-icon="mdi-microphone" class="flex-grow-1 py-3"
                :ripple="false">Inteligente</v-btn>
            </v-btn-toggle>
          </v-list-item>
          <v-list-item v-if="mode === 'Continuo'" :title="`Velocidad de reproducción: ${speed.toString()}`">
            <v-slider class="px-4" v-model="speed" min="1" max="99" step="1" hide-details></v-slider>
          </v-list-item>
          <v-list-item v-if="mode === 'Inteligente'" :title="`Ventana de reconocimiento: ${window.toString()}`">
            <v-slider class="px-4" v-model="window" min="1" max="9" step="1" hide-details></v-slider>
          </v-list-item>
          <v-list-item v-if="mode === 'Inteligente'" :title="`Margen de error: ${error.toString()}`">
            <v-slider class="px-4" v-model="error" min="0.1" max="0.5" step="0.1" hide-details></v-slider>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
          <v-list-subheader>Ajustes de voz</v-list-subheader>
          <v-list-item>
            <v-select label="Micrófono" variant="outlined" :items="audioDevices" item-title="label" item-value="value"
              v-model="micro" class="mt-2"></v-select>
            <v-autocomplete label="Idioma" variant="outlined" :items="languages" item-title="title" item-value="code"
              v-model="lang" :rules="[
                (val) =>
                  (val && val.length > 0) || 'Debe seleccionar un idioma',
              ]"></v-autocomplete>
          </v-list-item>
          <v-list-item
            subtitle="Grabar el audio del micrófono seleccionado para poder escuchar y descargar una vez finalizada la reproducción"
            title="Grabar audio" @click="audio = !audio">
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="audio" color="primary"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-list-item v-if="mode === 'Continuo'">
            <div class="text-h6 my-4">Comandos de voz</div>
            <v-row class="align-center px-4 pt-1">
              <label class="w-25">Reproducir:</label>
              <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                v-model="commands.Continuo.play"></v-combobox>
            </v-row>
            <v-row class="align-center px-4 pt-1">
              <label class="w-25">Pausar:</label>
              <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                v-model="commands.Continuo.pause"></v-combobox>
            </v-row>
            <v-row class="align-center px-4 pt-1 mb-2">
              <label class="w-25">Reiniciar:</label>
              <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                v-model="commands.Continuo.restart"></v-combobox>
            </v-row>
          </v-list-item>
          <v-list-item v-if="mode === 'Diapositivas'">
            <div class="text-h6 my-4">Comandos de voz</div>
            <v-row class="align-center px-4 pt-1">
              <label class="w-25">Anterior diapositiva:</label>
              <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                v-model="commands.Dispositivas.back"></v-combobox>
            </v-row>
            <v-row class="align-center px-4 pt-1 mb-2">
              <label class="w-25">Siguiente diapositiva:</label>
              <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                v-model="commands.Dispositivas.next"></v-combobox>
            </v-row>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
          <v-list-subheader>Ajustes adicionales</v-list-subheader>
          <v-row class="px-6">
            <v-col cols="12" md="6">
              <v-btn prepend-icon="mdi-upload" block @click="$refs.importInput.click()">Importar</v-btn>
              <input v-show="false" ref="importInput" type="file" @change="importFile($event)" accept=".json, .md">
            </v-col>
            <v-col cols="12" md="6">
              <ExportSelector></ExportSelector>
            </v-col>
            <v-snackbar v-model="snackbar.value" timeout="2000" :color="snackbar.color"><v-icon :icon="snackbar.icon"
                class="mr-2"></v-icon>{{ snackbar.text }}</v-snackbar>
          </v-row>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>